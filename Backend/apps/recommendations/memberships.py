"""
memberships.py

Defines fuzzy membership functions used by the facial recommendation engine.
"""

from typing import Dict

import numpy as np
# pyrefly: ignore [missing-import]
import skfuzzy as fuzz
# pyrefly: ignore [missing-import]
from skfuzzy import control as ctrl


MIN_SCORE = 0
MAX_SCORE = 100
STEP = 1

UNIVERSE = np.linspace(MIN_SCORE, MAX_SCORE, 101)


def create_score_antecedent(name: str) -> ctrl.Antecedent:
    """
    Create a fuzzy input variable representing a facial symmetry score.

    Parameters
    ----------
    name : str
        Name of the facial region
        (overall, eyes, eyebrows, nose, mouth, jaw)

    Returns
    -------
    ctrl.Antecedent
    """

    score = ctrl.Antecedent(UNIVERSE, name)

    # Low symmetry
    score["low"] = fuzz.trimf(
        score.universe,
        [0, 0, 55]
    )

    # Medium symmetry
    score["medium"] = fuzz.trimf(
        score.universe,
        [45, 70, 90]
    )

    # High symmetry
    score["high"] = fuzz.trimf(
        score.universe,
        [75, 100, 100]
    )

    return score


def create_input_variables() -> Dict[str, ctrl.Antecedent]:
    """
    Create all facial input variables.

    Returns
    -------
    dict
        Dictionary containing all Antecedents.
    """

    regions = [
        "overall",
        "eyes",
        "eyebrows",
        "nose",
        "mouth",
        "jaw",
    ]

    return {
        region: create_score_antecedent(region)
        for region in regions
    }


def create_priority_consequent() -> ctrl.Consequent:
    """
    Create fuzzy output variable representing recommendation priority.

    Output labels:
        low
        medium
        high
        very_high
    """

    priority = ctrl.Consequent(UNIVERSE, "priority")

    # Low recommendation priority
    priority["low"] = fuzz.trimf(
        priority.universe,
        [0, 0, 25]
    )

    # Medium recommendation priority
    priority["medium"] = fuzz.trimf(
        priority.universe,
        [20, 45, 70]
    )

    # High recommendation priority
    priority["high"] = fuzz.trimf(
        priority.universe,
        [60, 80, 95]
    )

    # Very High recommendation priority
    priority["very_high"] = fuzz.trimf(
    priority.universe,
    [85, 100, 100]
)

    return priority