from pydantic import BaseModel


class CodeSubmissionRequest(BaseModel):
    code: str
    language: str


class TestCase(BaseModel):
    input: str
    expected_output: str


class CodeExecutionRequest(BaseModel):
    code: str
    language: str
    test_cases: list[TestCase]