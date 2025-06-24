from fastapi import FastAPI, Request, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
import httpx # A modern HTTP client for Python

app = FastAPI(title="Spartex AI API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define internal URLs for microservices (Docker Compose service names)
AUTH_SERVICE_URL = "http://auth_service:8000"
RESUME_ANALYZER_SERVICE_URL = "http://resume_analyzer_service:8000"
DATA_INGESTION_SERVICE_URL = "http://data_ingestion_service:8000"

# --- Mock Authentication Dependency ---
async def verify_token(request: Request):
    """
    A simple mock authentication dependency.
    In a real app, this would call the actual Auth Service.
    """
    mock_token = request.headers.get("X-Mock-Auth-Token")
    if not mock_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization header missing")

    # Call Auth Service to validate the token
    async with httpx.AsyncClient() as client:
        try:
            auth_response = await client.get(f"{AUTH_SERVICE_URL}/validate-token?token={mock_token}")
            auth_response.raise_for_status()
            if not auth_response.json().get("is_valid"):
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid mock token")
        except httpx.RequestError:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Auth service is unavailable")
        except httpx.HTTPStatusError as exc:
            raise HTTPException(status_code=exc.response.status_code, detail="Auth service validation failed")
    
    return True # Token is valid


# --- Routes ---

# Health check for Gateway
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "API Gateway"}

# --- Proxy routes for existing Resume Analyzer (now with auth) ---
@app.post("/analyze")
async def proxy_analyze_resume(request: Request, authenticated: bool = Depends(verify_token)):
    """
    Proxies the /analyze request to the Resume Analyzer Service after authentication.
    """
    try:
        json_data = await request.json()
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{RESUME_ANALYZER_SERVICE_URL}/analyze", json=json_data)
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"Resume Analyzer Service unavailable: {exc.request.url}")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f"Resume Analyzer error: {exc.response.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal proxy error for /analyze: {str(e)}")

# --- Proxy routes for new Auth Service ---
@app.post("/auth/login")
async def proxy_auth_login(request: Request):
    try:
        json_data = await request.json()
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{AUTH_SERVICE_URL}/login", json=json_data)
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"Auth Service unavailable: {exc.request.url}")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f"Auth Service error: {exc.response.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal proxy error for /auth/login: {str(e)}")

@app.post("/auth/signup")
async def proxy_auth_signup(request: Request):
    try:
        json_data = await request.json()
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{AUTH_SERVICE_URL}/signup", json=json_data)
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"Auth Service unavailable: {exc.request.url}")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f"Auth Service error: {exc.response.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal proxy error for /auth/signup: {str(e)}")

# --- Proxy routes for new Data Ingestion Service ---
@app.post("/ingest")
async def proxy_data_ingest(request: Request, authenticated: bool = Depends(verify_token)):
    """
    Proxies the /ingest request (file upload) to the Data Ingestion Service after authentication.
    """
    try:
        # FastAPI's Request object handles multipart/form-data
        # We need to forward it as multipart/form-data to the backend service.
        # httpx allows forwarding the raw request body directly.
        
        async with httpx.AsyncClient() as client:
            # Reconstruct multipart form data for forwarding
            files = []
            form_data = {}
            
            # Read files from the original request
            async for field_name, file_data in request.form():
                if isinstance(file_data, UploadFile):
                    # httpx expects (filename, file_like_object, content_type)
                    files.append((field_name, (file_data.filename, file_data.file, file_data.content_type)))
                else:
                    form_data[field_name] = file_data

            response = await client.post(
                f"{DATA_INGESTION_SERVICE_URL}/ingest",
                files=files, # Pass files parameter to httpx
                data=form_data # Pass other form fields (if any)
            )
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"Data Ingestion Service unavailable: {exc.request.url}")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f"Data Ingestion error: {exc.response.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal proxy error for /ingest: {str(e)}")