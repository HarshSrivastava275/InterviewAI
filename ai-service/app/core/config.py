from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
    MODEL_NAME = os.getenv("MODEL_NAME", "mistral-small-latest")

settings = Settings()