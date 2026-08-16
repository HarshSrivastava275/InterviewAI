from pydantic import BaseModel
from typing import List


class Example(BaseModel):
    input: str
    output: str
    explanation: str


class TestCase(BaseModel):
    input: str
    expected_output: str


class InterviewRequest(BaseModel):
    topic: str
    difficulty: str
    language: str


class InterviewResponse(BaseModel):
    title: str
    description: str
    constraints: List[str]
    input_format: str
    output_format: str
    examples: List[Example]
    starter_code: str
    hidden_test_cases: List[TestCase]
    expected_time_complexity: str
    expected_space_complexity: str
    tags: List[str]