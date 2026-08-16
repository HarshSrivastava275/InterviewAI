from pydantic import BaseModel
from typing import List


class EvaluationRequest(BaseModel):
    question: str
    candidate_code: str
    language: str
    execution_result: dict


class EvaluationData(BaseModel):
    correctness_score: int
    time_complexity: str
    space_complexity: str
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[str]


class EvaluationResponse(BaseModel):
    success: bool
    message: str
    data: EvaluationData