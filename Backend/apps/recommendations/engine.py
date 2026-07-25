"""
Core fuzzy recommendation engine.

Converts facial symmetry analysis into personalized
exercise recommendations.
"""

from typing import Any, Dict, List

# pyrefly: ignore [missing-import]
from skfuzzy import control as ctrl

from .exercise_data import EXERCISES
from .memberships import (
    create_input_variables,
    create_priority_consequent,
)
from .rules import build_rules


class RecommendationEngine:
    """
    Facial exercise recommendation engine.
    """

    TARGET_SCORE = 85.0

    def __init__(self):
        self.inputs = create_input_variables()
        self.priority = create_priority_consequent()
        self.simulators = {}

        self._build_simulators()

    def _build_simulators(self):
        """
        Create one fuzzy simulator for each facial region.
        """

        regions = [
            "overall",
            "eyes",
            "eyebrows",
            "nose",
            "mouth",
            "jaw",
        ]

        for region in regions:

            rules = build_rules(
                self.inputs,
                self.priority,
                [region],
            )

            control_system = ctrl.ControlSystem(rules)

            self.simulators[region] = ctrl.ControlSystemSimulation(
                control_system
            )

    def _evaluate_region(self, region: str, score: float) -> float:
        """
        Evaluate one facial region.
        """

        simulator = self.simulators[region]

        simulator.input[region] = score

        simulator.compute()

        return float(simulator.output["priority"])


    def _priority_label(self, priority: float) -> str:

        if priority >= 80:
            return "Very High"

        if priority >= 60:
            return "High"

        if priority >= 40:
            return "Medium"

        return "Low"

    def _get_priority_category(self, priority: float) -> str:
        """
        Convert fuzzy output into a linguistic category.
        """

        if priority >= 80:
            return "very_high"

        if priority >= 60:
            return "high"

        if priority >= 40:
            return "medium"

        return "low"

    def _calculate_final_priority(
        self,
        category: str,
        score_gap: float,
        weight: float,
    ) -> float:
        """
        Convert fuzzy category + score gap into
        a user-friendly priority score.
        """

        base_scores = {
            "low": 25,
            "medium": 50,
            "high": 75,
            "very_high": 100,
        }

        base = base_scores[category]

        # Increase priority depending on
        # how far below the target score we are.
        bonus = min(score_gap * 1.5, 20)

        priority = (base + bonus) * weight

        return min(priority, 100.0)


    def _generate_reason(
        self,
        exercise: Dict[str, Any],
        symmetry_result: Dict[str, Any],
    ) -> str:

        scores = {}

        for region in exercise["target_regions"]:

            if region == "overall":
                scores[region] = symmetry_result["overall_score"]
            else:
                scores[region] = symmetry_result["region_scores"][region]

        weakest_region = min(scores, key=scores.get)
        weakest_score = scores[weakest_region]

        target = self.TARGET_SCORE

        if weakest_score >= target:
            return (
                f"{weakest_region.capitalize()} symmetry score "
                f"({weakest_score:.2f}) is already healthy. "
                f"This exercise is recommended for maintenance."
            )

        difference = target - weakest_score

        if difference >= 20:
            level = "significantly below"

        elif difference >= 10:
            level = "below"

        else:
            level = "slightly below"

        if len(scores) == 1:

            return (
                f"{weakest_region.capitalize()} symmetry score "
                f"({weakest_score:.2f}) is {level} "
                f"the target score of {self.TARGET_SCORE:.0f}."
            )

        region_names = ", ".join(scores.keys())

        return (
            f"This exercise targets {region_names}. "
            f"The weakest region is "
            f"{weakest_region} ({weakest_score:.2f})."
        )

    def generate(
        self,
        symmetry_result: Dict[str, Any],
    ) -> List[Dict[str, Any]]:

        priorities = {}

        # Overall
        priorities["overall"] = self._evaluate_region(
            "overall",
            symmetry_result["overall_score"],
        )

        # Region scores
        for region, score in symmetry_result["region_scores"].items():

            priorities[region] = self._evaluate_region(
                region,
                score,
            )

        recommendations = []

        for exercise in EXERCISES:

            region_priorities = [
                priorities[region]
                for region in exercise["target_regions"]
            ]

            avg_priority = (
                 sum(region_priorities)
                / len(region_priorities)
            )

            current_scores = {}

            for region in exercise["target_regions"]:

                if region == "overall":
                    current_scores[region] = symmetry_result["overall_score"]
                else:
                    current_scores[region] = (
                        symmetry_result["region_scores"][region]
                    )

            weakest_score = min(current_scores.values())

            score_gap = max(
                0,
                self.TARGET_SCORE - weakest_score
            )

            category = self._get_priority_category(
                avg_priority
            )

            final_priority = self._calculate_final_priority(
                category,
                score_gap,
                exercise["weight"],
            )

            current_scores = {}

            for region in exercise["target_regions"]:

                if region == "overall":
                    current_scores[region] = symmetry_result[
                        "overall_score"
                    ]
                else:
                    current_scores[region] = (
                        symmetry_result["region_scores"][region]
                    )

            recommendations.append(
                {
                    **exercise,

                    "priority": round(
                        float(final_priority),
                        2,
                    ),

                    "priority_category": category,

                    "priority_label": self._priority_label(
                        final_priority
                    ),

                    "reason": self._generate_reason(
                        exercise,
                        symmetry_result,
                    ),

                    "affected_regions": exercise[
                        "target_regions"
                    ],

                    "current_scores": current_scores,

                    "target_score": self.TARGET_SCORE,
                }
            )

        recommendations.sort(
            key=lambda item: item["priority"],
            reverse=True,
        )
        return recommendations