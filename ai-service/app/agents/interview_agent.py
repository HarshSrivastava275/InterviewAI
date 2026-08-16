import json

from app.services.llm_factory import get_llm


class InterviewAgent:

    def __init__(self):

        self.llm = get_llm()


    async def generate_question(
        self,
        topic: str,
        difficulty: str,
        language: str,
    ):

        prompt = f"""
You are an expert technical interviewer.


Generate ONE coding interview question.


Topic: {topic}
Difficulty: {difficulty}
Programming Language: {language}


Return ONLY valid JSON.


The JSON MUST have exactly this structure:


{{
    "title": "Question title",

    "description": "Complete problem description",

    "constraints": [
        "constraint 1",
        "constraint 2"
    ],

    "input_format": "Input format",

    "output_format": "Output format",

    "examples": [
        {{
            "input": "example input",
            "output": "example output",
            "explanation": "explanation"
        }}
    ],

    "starter_code": "Starter code",

    "hidden_test_cases": [
        {{
            "input": "test input",
            "expected_output": "test output"
        }}
    ],

    "expected_time_complexity": "Expected time complexity",

    "expected_space_complexity": "Expected space complexity",

    "tags": [
        "tag1",
        "tag2"
    ]
}}


====================================================
QUESTION RULES
====================================================


1. Return ONLY valid JSON.


2. Do NOT use Markdown.


3. Do NOT use ```json.


4. Generate exactly ONE coding problem.


5. The problem must match the requested topic.


6. The problem must match the requested difficulty.


7. The problem must be solvable using the requested
   programming language.


8. The description must completely explain the problem.


9. The constraints must match the problem.


10. The input_format must describe EVERY input value.


11. The output_format must describe the expected output.


====================================================
STARTER CODE RULES
====================================================


12. starter_code is code shown to the candidate.


13. starter_code MUST NOT contain the solution.


14. NEVER provide the algorithm implementation.


15. NEVER provide the answer.


16. NEVER provide the optimal approach.


17. NEVER provide solution logic inside comments.


18. starter_code may contain:


    - required imports
    - using namespace
    - function/class signature
    - main()
    - input handling
    - output handling
    - TODO comments


19. The solution function MUST be empty or contain only:


    // Write your solution here


20. If main() is required, main() should handle input
    and output but must call the empty solution function.


21. Do NOT implement the algorithm inside main().


22. Do NOT use helper functions that already implement
    the solution.


23. Do NOT call standard-library functions that directly
    solve the problem.


For example, if the problem is to find the maximum:


CORRECT:


int findMaximum(vector<int>& nums) {{
    // Write your solution here
}}


INCORRECT:


int findMaximum(vector<int>& nums) {{
    return *max_element(nums.begin(), nums.end());
}}


For matrix rotation:


CORRECT:


void rotate(vector<vector<int>>& matrix) {{
    // Write your solution here
}}


INCORRECT:


void rotate(vector<vector<int>>& matrix) {{

    for (int i = 0; i < matrix.size(); i++) {{
        for (int j = i + 1; j < matrix.size(); j++) {{
            swap(matrix[i][j], matrix[j][i]);
        }}
    }}

    for (auto& row : matrix) {{
        reverse(row.begin(), row.end());
    }}
}}


====================================================
HIDDEN TEST CASE RULES
====================================================


26. Hidden test cases are NOT shown to the candidate.


27. Hidden test cases must follow the exact input_format.


28. Every hidden test case must be valid.


29. If n represents the number of array elements,
    the array must contain exactly n elements.


30. If the problem requires additional values such as
    k, target, limit, etc., include them.


31. Expected output must be correct.


32. Hidden tests should cover:


    - normal cases
    - edge cases
    - boundary cases
    - important algorithmic cases


33. Do NOT put solution code inside hidden_test_cases.


====================================================
EXAMPLES
====================================================


34. Examples may show input/output.


35. Examples must NOT contain the solution code.


36. Examples should help the candidate understand the
    problem but must not reveal the algorithm.


====================================================
SECURITY / INTERVIEW RULE
====================================================


The purpose of this system is to evaluate the candidate.


Therefore:


NEVER reveal the solution in:


- starter_code
- description
- constraints
- examples
- comments
- function names
- variable names
- hints


====================================================
FINAL VALIDATION
====================================================


Before returning JSON, verify:


1. Is starter_code compilable?
2. Is starter_code free of the solution?
3. Can the candidate write their solution inside it?
4. Does starter_code read input correctly?
5. Does starter_code print output correctly?
6. Do hidden tests follow input_format?
7. Are expected outputs correct?


Generate the question now.
"""


        response = await self.llm.ainvoke(
            prompt
        )

        content = response.content

        return self._parse_response(
            content
        )


    def _parse_response(
        self,
        content: str
    ):

        content = content.strip()

        if content.startswith("```"):

            content = content.replace(
                "```json",
                ""
            )

            content = content.replace(
                "```",
                ""
            )

            content = content.strip()

        return json.loads(
            content
        )