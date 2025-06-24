from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Resume Analyzer Service")

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity in prototype
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeAnalysisRequest(BaseModel):
    resume: str

@app.post("/analyze")
async def analyze_resume(request: ResumeAnalysisRequest):
    """
    Performs a basic analysis of the provided resume text.
    For this prototype, it just counts words and characters.
    """
    text = request.resume
    word_count = len(text.split())
    char_count = len(text)
    
    return {
        "status": "success",
        "message": "Resume analysis complete!",
        "analysis_results": {
            "word_count": word_count,
            "character_count": char_count,
            "first_50_chars": text[:50] + "..." if len(text) > 50 else text
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Resume Analyzer"}from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Resume Analyzer Service")

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity in prototype
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeAnalysisRequest(BaseModel):
    resume: str

@app.post("/analyze")
async def analyze_resume(request: ResumeAnalysisRequest):
    """
    Performs a basic analysis of the provided resume text.
    For this prototype, it just counts words and characters.
    """
    text = request.resume
    word_count = len(text.split())
    char_count = len(text)
    
    return {
        "status": "success",
        "message": "Resume analysis complete!",
        "analysis_results": {
            "word_count": word_count,
            "character_count": char_count,
            "first_50_chars": text[:50] + "..." if len(text) > 50 else text
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Resume Analyzer"}