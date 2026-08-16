from fastapi import APIRouter, HTTPException

from app.schemas.evaluation_schema import (
    EvaluationRequest,
    EvaluationResponse,
)

from app.agents.evaluation_agent import EvaluationAgent


router = APIRouter()

agent = EvaluationAgent()


@router.post(
    "/evaluate",
    response_model=EvaluationResponse,
)
async def evaluate_code(request: EvaluationRequest):

    try:

        result = await agent.evaluate(
            question=request.question,
            candidate_code=request.candidate_code,
            language=request.language,
            execution_result=request.execution_result,
        )

        return EvaluationResponse(
            success=True,
            message="Solution Evaluated Successfully",
            data=result,
        )

    except Exception as e:

        print("AI EVALUATION ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )