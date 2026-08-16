from app.execution.test_case_runner import TestCaseRunner


runner = TestCaseRunner()


code = """
#include <iostream>
using namespace std;

int main() {

    int a, b;

    cin >> a >> b;

    cout << a + b;

    return 0;
}
"""


test_cases = [
    {
        "input": "10 20\n",
        "expected_output": "30",
    },
    {
        "input": "5 7\n",
        "expected_output": "12",
    },
    {
        "input": "100 200\n",
        "expected_output": "300",
    },
    {
        "input": "-5 10\n",
        "expected_output": "5",
    },
]


result = runner.run_test_cases(
    code=code,
    test_cases=test_cases,
)


print(result)