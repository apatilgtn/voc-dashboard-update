# backend/main.py
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
import sqlite3
import jwt
from passlib.context import CryptContext
import pandas as pd
from textblob import TextBlob

# Security configuration
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        hashed_password TEXT,
        is_active BOOLEAN
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        sentiment_score REAL,
        source TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Add default admin user
    hashed_password = pwd_context.hash("admin123")
    cursor.execute('''
    INSERT OR IGNORE INTO users (username, hashed_password, is_active)
    VALUES (?, ?, ?)
    ''', ("admin", hashed_password, True))
    
    conn.commit()
    conn.close()

# Models
class Token(BaseModel):
    access_token: str
    token_type: str

class Feedback(BaseModel):
    text: str
    source: str

# Authentication
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception
    return username

# Routes
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(
        "SELECT hashed_password FROM users WHERE username = ?", 
        (form_data.username,)
    )
    result = cursor.fetchone()
    conn.close()
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
        
    if not pwd_context.verify(form_data.password, result[0]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/feedback/")
async def add_feedback(
    feedback: Feedback,
    current_user: str = Depends(get_current_user)
):
    # Calculate sentiment
    blob = TextBlob(feedback.text)
    sentiment_score = blob.sentiment.polarity
    
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO feedback (text, sentiment_score, source)
    VALUES (?, ?, ?)
    ''', (feedback.text, sentiment_score, feedback.source))
    
    conn.commit()
    conn.close()
    
    return {"message": "Feedback added successfully"}

@app.get("/analytics/")
async def get_analytics(current_user: str = Depends(get_current_user)):
    conn = sqlite3.connect('database.db')
    
    # Get overall sentiment statistics
    df = pd.read_sql_query('''
    SELECT 
        AVG(sentiment_score) as avg_sentiment,
        COUNT(*) as total_feedback,
        source,
        DATE(timestamp) as date
    FROM feedback
    GROUP BY source, DATE(timestamp)
    ORDER BY date DESC
    ''', conn)
    
    conn.close()
    
    return {
        "trends": df.to_dict(orient='records'),
        "summary": {
            "avg_sentiment": df['avg_sentiment'].mean(),
            "total_feedback": int(df['total_feedback'].sum())
        }
    }

@app.get("/export/")
async def export_data(
    format: str = "csv",
    current_user: str = Depends(get_current_user)
):
    conn = sqlite3.connect('database.db')
    df = pd.read_sql_query('SELECT * FROM feedback', conn)
    conn.close()
    
    if format == "csv":
        return df.to_csv(index=False)
    return df.to_dict(orient='records')

# Initialize the application
@app.on_event("startup")
async def startup_event():
    init_db()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)