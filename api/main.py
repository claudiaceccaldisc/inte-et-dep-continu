import mysql.connector
import os
import time
from fastapi import FastAPI
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
                host="db", 
                user="root",
                password=os.getenv("MYSQL_ROOT_PASSWORD"),
                database=os.getenv("MYSQL_DATABASE"),
                port=3306
            )
            return conn
        except Exception as e:
            print(f" Tentative {i+1}/10 : MySQL pas prêt...")
            time.sleep(2)
    raise Exception("❌ Impossible de se connecter à MySQL")


@app.get("/")
def read_root():
    return {"message": "API is running "}


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
        return {"error": str(e)}