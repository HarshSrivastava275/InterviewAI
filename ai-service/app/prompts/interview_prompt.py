from langchain_core.prompts import ChatPromptTemplate

question_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are a Senior Google Software Engineer.

Your job is to create ORIGINAL coding interview questions.

Rules:
- Never copy LeetCode questions.
- Create realistic interview questions.
- Difficulty must exactly match the requested level.
- Return ONLY valid JSON.
- No markdown.
- No explanation outside JSON.
"""
        ),
        (
            "human",
            """
Topic: {topic}

Difficulty: {difficulty}

Programming Language: {language}

Generate JSON with:

{
"title":"",
"description":"",
"constraints":[],
"input_format":"",
"output_format":"",
"examples":[],
"starter_code":"",
"hidden_test_cases":[],
"expected_time_complexity":"",
"expected_space_complexity":"",
"tags":[]
}
"""
        )
    ]
)