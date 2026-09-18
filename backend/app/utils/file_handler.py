import os
import shutil
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads/riders"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

def validate_file(file: UploadFile):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, f"Invalid file type: {file.content_type}. Allowed: JPEG, PNG, WEBP")
    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)
    if size > MAX_FILE_SIZE:
        raise HTTPException(400, f"File too large: {size / 1024 / 1024:.1f}MB. Max: 5MB")

def save_upload(file: UploadFile, application_id: str, prefix: str) -> str:
    validate_file(file)
    dir_path = os.path.join(UPLOAD_DIR, application_id)
    os.makedirs(dir_path, exist_ok=True)
    ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    filename = f"{prefix}.{ext}"
    file_path = os.path.join(dir_path, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return file_path