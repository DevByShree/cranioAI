"""

Master database of facial exercises used by the fuzzy recommendation engine.

"""

EXERCISES = [

    {
        "id": "facial_massage",

        "title": "Facial Massage Routine",

        "category": "Face",

        "difficulty": "Easy",

        "duration": "5 min daily",

        "description":
            "Gentle circular massage to improve blood circulation and muscle tone.",

        # Which facial scores affect this exercise
        "target_regions": [
            "overall"
        ],

        # Relative importance
        "weight": 1.00
    },

    {
        "id": "cheek_toning",

        "title": "Cheek Toning Exercise",

        "category": "Face",

        "difficulty": "Easy",

        "duration": "3 sets × 12 reps",

        "description":
            "Strengthens cheek muscles and improves facial balance.",

        "target_regions": [
            "overall",
            "mouth"
        ],

        "weight": 1.05
    },

    {
        "id": "jaw_alignment",

        "title": "Jaw Alignment Exercise",

        "category": "Jaw",

        "difficulty": "Medium",

        "duration": "3 sets × 10 reps",

        "description":
            "Controlled jaw movements to improve alignment.",

        "target_regions": [
            "jaw"
        ],

        "weight": 1.20
    },

    {
        "id": "chin_lift",

        "title": "Chin Lift & Hold",

        "category": "Jaw",

        "difficulty": "Hard",

        "duration": "4 sets × 20 sec",

        "description":
            "Strengthens jawline and neck muscles.",

        "target_regions": [
            "jaw",
            "mouth"
        ],

        "weight": 1.30
    },

    {
        "id": "eye_symmetry",

        "title": "Eye Symmetry Drill",

        "category": "Eyes",

        "difficulty": "Easy",

        "duration": "2 sets × 15 reps",

        "description":
            "Improves eye muscle balance.",

        "target_regions": [
            "eyes"
        ],

        "weight": 1.15
    },

    {
        "id": "eye_focus",

        "title": "Eye Focus Training",

        "category": "Eyes",

        "difficulty": "Medium",

        "duration": "2 sets × 10 reps",

        "description":
            "Focus shifting exercise to strengthen eye coordination.",

        "target_regions": [
            "eyes",
            "eyebrows"
        ],

        "weight": 1.10
    }

]