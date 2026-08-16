from fastapi import APIRouter

from app.models.submission import SubmissionRequest
from app.execution.test_case_runner import TestCaseRunner


router = APIRouter(
    prefix="/api/submission",
    tags=["Submission"]
)


runner = TestCaseRunner()


@router.post("/run")
async def run_submission(request: SubmissionRequest):

    if request.language.lower() != "cpp":

        return {
            "success": False,
            "message": "Currently only C++ is supported."
        }

    hidden_test_cases = request.question.get(
        "hidden_test_cases",
        []
    )

    if not hidden_test_cases:

        return {
            "success": False,
            "message": "No hidden test cases found."
        }

    result = runner.run_test_cases(
        code=request.code,
        test_cases=hidden_test_cases
    )

    return {
        "success": True,
        "message": "Code evaluated successfully",
        "data": result
    }