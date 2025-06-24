from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Data Ingestion Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Placeholder for storage directory (adjust as needed)
UPLOAD_DIR = "./uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/ingest")
async def ingest_file(file: UploadFile = File(...)):
    """
    Ingests an uploaded file and saves it to a local directory.
    In a real scenario, this would involve more robust storage (S3, GCS)
    and potentially trigger processing pipelines.
    """
    try:
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
        return {"message": f"File '{file.filename}' ingested successfully!", "path": file_location, "size": file.size}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to ingest file: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Data Ingestion Service"}