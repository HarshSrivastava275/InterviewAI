import subprocess
import tempfile
from pathlib import Path


class CppRunner:

    def compile(
        self,
        code: str,
        temp_dir: str,
        compile_timeout: int = 10,
    ):

        temp_path = Path(temp_dir)

        source_file = temp_path / "solution.cpp"
        executable = temp_path / "solution.exe"

        source_file.write_text(
            code,
            encoding="utf-8"
        )

        try:

            result = subprocess.run(
                [
                    "g++",
                    str(source_file),
                    "-o",
                    str(executable),
                ],
                capture_output=True,
                text=True,
                timeout=compile_timeout,
            )

        except subprocess.TimeoutExpired:

            return {
                "success": False,
                "status": "compile_timeout",
                "stderr": "Compilation timed out.",
            }

        if result.returncode != 0:

            return {
                "success": False,
                "status": "compile_error",
                "stderr": result.stderr,
            }

        return {
            "success": True,
            "status": "compiled",
            "executable": str(executable),
        }


    def execute(
        self,
        executable: str,
        input_data: str,
        execution_timeout: int = 2,
    ):

        try:

            result = subprocess.run(
                [executable],
                input=input_data,
                capture_output=True,
                text=True,
                timeout=execution_timeout,
            )

            return {
                "status": (
                    "success"
                    if result.returncode == 0
                    else "runtime_error"
                ),
                "stdout": result.stdout,
                "stderr": result.stderr,
            }

        except subprocess.TimeoutExpired:

            return {
                "status": "timeout",
                "stdout": "",
                "stderr": "Execution timed out.",
            }


    def run(
        self,
        code: str,
        input_data: str,
        compile_timeout: int = 10,
        execution_timeout: int = 2,
    ):

        with tempfile.TemporaryDirectory() as temp_dir:

            compilation = self.compile(
                code=code,
                temp_dir=temp_dir,
                compile_timeout=compile_timeout,
            )

            if not compilation["success"]:

                return {
                    "status": compilation["status"],
                    "stdout": "",
                    "stderr": compilation["stderr"],
                }

            return self.execute(
                executable=compilation["executable"],
                input_data=input_data,
                execution_timeout=execution_timeout,
            )