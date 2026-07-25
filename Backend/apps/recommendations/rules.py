"""

Creates fuzzy rules dynamically based on
the facial regions used by an exercise.

"""

# pyrefly: ignore [missing-import]
from skfuzzy import control as ctrl


def build_rules(inputs, priority, target_regions):
    """
    Build fuzzy rules for a single exercise.

    Parameters
    ----------
    inputs : dict
        Input fuzzy variables.

    priority : Consequent
        Output priority variable.

    target_regions : list[str]
        Facial regions affected by this exercise.

    Returns
    -------
    list[ctrl.Rule]
    """

    rules = []

    # Individual region rules
    for region in target_regions:

        variable = inputs[region]

        rules.append(
            ctrl.Rule(
                variable["low"],
                priority["very_high"]
            )
        )

        rules.append(
            ctrl.Rule(
                variable["medium"],
                priority["medium"]
            )
        )

        rules.append(
            ctrl.Rule(
                variable["high"],
                priority["low"]
            )
        )

    # Combined rule
    if len(target_regions) >= 2:

        antecedent = inputs[target_regions[0]]["low"]

        for region in target_regions[1:]:
            antecedent = antecedent & inputs[region]["low"]

        rules.append(
            ctrl.Rule(
                antecedent,
                priority["very_high"]
            )
        )

    return rules