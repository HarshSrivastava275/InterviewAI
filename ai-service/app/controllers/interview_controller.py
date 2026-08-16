from fastapi import APIRouter

from app.schemas.interview_schema import (
    InterviewRequest,
    InterviewResponse,
)

from app.graph.workflow import workflow


router = APIRouter()


@router.post("/generate-question")
async def generate_question(request: InterviewRequest):

    try:

        result = await workflow.ainvoke(
            {
                "topic": request.topic,
                "difficulty": request.difficulty,
                "language": request.language,
                "question": {},
                "retry_count": 0,
            }
        )

        if not result.get("question_valid"):
            return {
                "success": False,
                "message": "Unable to generate a valid interview question.",
                "error": result.get("validation_error"),
            }

        return {
            "success": True,
            "message": "Question Generated Successfully",
            "data": result["question"],
        }

    except Exception as error:

        print("AI QUESTION ERROR:", repr(error))

        return {
            "success": False,
            "message": str(error),
        }