from fastapi import FastAPI # This line must be at the top, by itself
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local testing only, restrict in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeRequest(BaseModel):
    resume: str

@app.post("/analyze")
async def analyze_resume(request: ResumeRequest):
    # Dummy analysis: count words & characters
    text = request.resume
    words = len(text.split())
    chars = len(text)
    # This return statement must be clean and on its own line
    return {"word_count": words, "char_count": chars, "message": "Resume analyzed successfully"}