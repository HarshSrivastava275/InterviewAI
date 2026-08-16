from app.agents.interview_agent import InterviewAgent
from app.agents.evaluation_agent import EvaluationAgent


interview_agent = InterviewAgent()
evaluation_agent = EvaluationAgent()


async def generate_question_node(state):

    retry_count = state.get("retry_count", 0)

    question = await interview_agent.generate_question(
        topic=state["topic"],
        difficulty=state["difficulty"],
        language=state["language"],
    )

    return {
        **state,
        "question": question,
        "retry_count": retry_count + 1,
    }


async def validate_question_node(state):

    question = state.get("question")

    if not question:
        return {
            **state,
            "question_valid": False,
            "validation_error": "Question was not generated.",
        }

    required_fields = [
        "title",
        "description",
        "constraints",
        "input_format",
        "output_format",
        "examples",
        "starter_code",
        "expected_time_complexity",
        "expected_space_complexity",
        "tags",
        "hidden_test_cases",
    ]

    missing_fields = [
        field
        for field in required_fields
        if field not in question
    ]

    if missing_fields:
        return {
            **state,
            "question_valid": False,
            "validation_error": (
                f"Missing fields: {missing_fields}"
            ),
        }

    if not question["examples"]:
        return {
            **state,
            "question_valid": False,
            "validation_error": "Question must contain examples.",
        }

    if not question["hidden_test_cases"]:
        return {
            **state,
            "question_valid": False,
            "validation_error": (
                "Question must contain hidden test cases."
            ),
        }

    # Validate hidden test cases
    for index, test_case in enumerate(
        question["hidden_test_cases"]
    ):

        if "input" not in test_case:
            return {
                **state,
                "question_valid": False,
                "validation_error": (
                    f"Hidden test case {index + 1} "
                    "is missing input."
                ),
            }

        if "expected_output" not in test_case:
            return {
                **state,
                "question_valid": False,
                "validation_error": (
                    f"Hidden test case {index + 1} "
                    "is missing expected output."
                ),
            }

    return {
        **state,
        "question_valid": True,
        "validation_error": None,
    }


async def evaluate_solution_node(state):

    question = state["question"]

    evaluation = await evaluation_agent.evaluate(
        question=question["description"],
        candidate_code=state["candidate_code"],
        language=state["language"],
        execution_result=state["execution_result"],
    )

    return {
        **state,
        "evaluation": evaluation,
    }