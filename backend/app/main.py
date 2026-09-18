from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, Base
from .routers import applications, admin
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sare Express API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://sareexpress.ng"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(applications.router)
app.include_router(admin.router)

@app.get("/")
def root():
    return {"message": "Sare Express API", "status": "running"}