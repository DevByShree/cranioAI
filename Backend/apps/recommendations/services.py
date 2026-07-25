"""

Service layer for the recommendation engine.

This module hides the fuzzy engine implementation from the rest
of the Django application.
"""

# pyrefly: ignore [missing-import]
from .engine import RecommendationEngine


class RecommendationService:
    """
    High-level service used by the API layer.
    """

    def __init__(self):
        self.engine = RecommendationEngine()

    def generate(self, symmetry_result):
        """
        Generate exercise recommendations.

        Parameters
        ----------
        symmetry_result : dict
            Output returned by SymmetryAnalysisService.analyze()

        Returns
        -------
        list
            Sorted recommendation list.
        """

        return self.engine.generate(symmetry_result)