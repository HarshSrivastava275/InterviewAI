from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers.interview_controller import router as interview_router
from app.controllers.submission_controller import router as submission_router
from app.controllers.evaluation_controller import router as evaluation_router
from app.controllers.execution_controller import router as execution_router


app = FastAPI(
    title="InterviewAI",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Interview
app.include_router(
    interview_router,
    prefix="/api/interview",
    tags=["Interview"],
)


# Submission
app.include_router(
    submission_router,
)


# Evaluation
app.include_router(
    evaluation_router,
    prefix="/api/evaluation",
    tags=["Evaluation"],
)


# Code Execution
app.include_router(
    execution_router,
    prefix="/api/code",
    tags=["Code Execution"],
)


@app.get("/")
def home():

    return {
        "success": True,
        "message": "InterviewAI AI Service Running",
    }


 