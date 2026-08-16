import tempfile

from app.execution.cpp_runner import CppRunner


class TestCaseRunner:

    def __init__(self):
        self.runner = CppRunner()


    def run_test_cases(
        self,
        code: str,
        test_cases: list,
    ):

        results = []

        with tempfile.TemporaryDirectory() as temp_dir:

            # Compile only once
            compilation = self.runner.compile(
                code=code,
                temp_dir=temp_dir,
            )

            # Compilation failed
            if not compilation["success"]:

                return {
                    "total": len(test_cases),
                    "passed": 0,
                    "failed": len(test_cases),
                    "compile_error": compilation["stderr"],
                    "results": [],
                }

            executable = compilation["executable"]

            # Run every test case
            for index, test_case in enumerate(
                test_cases,
                start=1
            ):

                result = self.runner.execute(
                    executable=executable,
                    input_data=test_case["input"],
                )

                actual_output = result["stdout"].strip()

                expected_output = (
                    test_case["expected_output"]
                    .strip()
                )

                passed = (
                    result["status"] == "success"
                    and actual_output == expected_output
                )

                results.append({
                    "test_case": index,
                    "input": test_case["input"],
                    "expected_output": expected_output,
                    "actual_output": actual_output,
                    "status": result["status"],
                    "passed": passed,
                    "stderr": result["stderr"],
                })

        passed_count = sum(
            result["passed"]
            for result in results
        )

        return {
            "total": len(results),
            "passed": passed_count,
            "failed": len(results) - passed_count,
            "results": results,
        }