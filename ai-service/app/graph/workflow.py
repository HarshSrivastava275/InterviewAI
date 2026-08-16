from langgraph.graph import StateGraph, START, END

from app.graph.state import InterviewState

from app.graph.nodes import (
    generate_question_node,
    validate_question_node,
)


builder = StateGraph(InterviewState)


builder.add_node(
    "generate_question",
    generate_question_node,
)

builder.add_node(
    "validate_question",
    validate_question_node,
)


builder.add_edge(
    START,
    "generate_question",
)


builder.add_edge(
    "generate_question",
    "validate_question",
)


def question_validation_router(state):

    if state.get("question_valid"):
        return "valid"

    if state.get("retry_count", 0) >= 3:
        return "failed"

    return "retry"


builder.add_conditional_edges(
    "validate_question",
    question_validation_router,
    {
        "valid": END,
        "retry": "generate_question",
        "failed": END,
    },
)


workflow = builder.compile()