from typing import TypedDict


class InterviewState(TypedDict, total=False):

    topic: str
    difficulty: str
    language: str

    question: dict

    candidate_code: str

    execution_result: dict

    evaluation: dict

    retry_count: int

    question_valid: bool

    validation_error: str