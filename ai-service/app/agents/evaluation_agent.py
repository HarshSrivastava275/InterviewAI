from app.prompts.evaluation_prompt import evaluation_prompt
from app.services.llm_factory import get_llm
from app.utils.json_parser import parse_json


class EvaluationAgent:

    def __init__(self):
        self.llm = get_llm()

    async def evaluate(
        self,
        question: str,
        candidate_code: str,
        language: str,
        execution_result: dict,
    ):

        prompt = evaluation_prompt.format(
            question=question,
            candidate_code=candidate_code,
            language=language,
            execution_result=execution_result,
        )

        response = await self.llm.generate(prompt)

        return parse_json(response)