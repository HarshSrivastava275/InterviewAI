from pydantic import BaseModel


class TestCase(BaseModel):
    input: str
    expected_output: str


class CodeExecutionRequest(BaseModel):
    code: str
    language: str
    test_cases: list[TestCase]