import os
from mistralai.client import Mistral


class MistralLLM:

    def __init__(self):
        api_key = os.getenv("MISTRAL_API_KEY")

        if not api_key:
            raise ValueError("MISTRAL_API_KEY is not set.")

        self.client = Mistral(api_key=api_key)

    async def ainvoke(self, prompt: str):

        response = self.client.chat.complete(
            model="mistral-small-latest",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return response.choices[0].message

    async def generate(self, prompt: str):

        response = await self.ainvoke(prompt)

        return response.content