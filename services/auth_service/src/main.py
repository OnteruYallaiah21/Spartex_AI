from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Auth Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserLogin(BaseModel):
    username: str
    password: str

class UserSignup(BaseModel):
    username: str
    password: str
    email: str

# Mock user database
MOCK_USERS = {"testuser": "testpassword"}
MOCK_TOKENS = {"mock-token-123": "testuser"} # For simple validation by gateway

@app.post("/login")
async def login(user: UserLogin):
    if user.username in MOCK_USERS and MOCK_USERS[user.username] == user.password:
        # In a real app: generate JWT
        return {"message": "Login successful", "token": "mock-token-123"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/signup")
async def signup(user: UserSignup):
    if user.username in MOCK_USERS:
        raise HTTPException(status_code=409, detail="Username already exists")
    MOCK_USERS[user.username] = user.password
    return {"message": "User registered successfully"}

@app.get("/validate-token")
async def validate_token(token: str):
    if token in MOCK_TOKENS:
        return {"is_valid": True, "username": MOCK_TOKENS[token]}
    raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Auth Service"}