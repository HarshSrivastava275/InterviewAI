from fastapi import APIRouter

from app.schemas.execution_schema import CodeExecutionRequest
from app.execution.cpp_runner import CppRunner


router = APIRouter()

cpp_runner = CppRunner()


@router.post("/execute")
async def execute_code(request: CodeExecutionRequest):

    try:

        if request.language.lower() != "cpp":
            return {
                "success": False,
                "message": "Currently only C++ is supported.",
            }

        results = []

        passed = 0

        for index, test_case in enumerate(request.test_cases):

            result = cpp_runner.run(
                code=request.code,
                input_data=test_case.input,
            )

            actual_output = result.get("stdout", "").strip()
            expected_output = test_case.expected_output.strip()

            is_passed = (
                actual_output == expected_output
            )

            if is_passed:
                passed += 1

            results.append({
                "test_case": index + 1,
                "input": test_case.input,
                "expected_output": expected_output,
                "actual_output": actual_output,
                "status": "passed" if is_passed else "failed",
                "passed": is_passed,
                "stderr": result.get("stderr", ""),
            })

        return {
            "success": True,
            "message": "Code executed successfully",
            "data": {
                "total": len(request.test_cases),
                "passed": passed,
                "failed": len(request.test_cases) - passed,
                "results": results,
            },
        }

    except Exception as error:

        print("CODE EXECUTION ERROR:", repr(error))

        return {
            "success": False,
            "message": str(error),
        }