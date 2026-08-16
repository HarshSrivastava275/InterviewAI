from pydantic import BaseModel


class SubmissionRequest(BaseModel):
    code: str
    language: str
    question: dict