import os
import time
import mysql.connector
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_connection():
    for i in range(10):
        try:
            conn = mysql.connector.connect(
                host=os.getenv("MYSQL_HOST", "db"),
                user=os.getenv("MYSQL_USER", "root"),
                password=os.getenv("MYSQL_ROOT_PASSWORD"),
                database=os.getenv("MYSQL_DATABASE", "users"),
                port=int(os.getenv("MYSQL_PORT", "3306"))
            )
            return conn
        except Exception:
            print(f"Tentative {i+1}/10 : MySQL pas prêt...")
            time.sleep(2)
    raise Exception("Impossible de se connecter à MySQL")

@app.get("/")
def read_root():
    return {"message": "API is running"}

@app.get("/health")
def health():
    try:
        conn = get_connection()
        conn.close()
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

@app.get("/users")
def get_users():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM utilisateur")
        users = cursor.fetchall()
        cursor.close()
        conn.close()
        return {"utilisateurs": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
