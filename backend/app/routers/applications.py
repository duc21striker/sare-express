from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import uuid
from datetime import datetime
from .. import models, schemas
from ..database import get_db
from ..utils.file_handler import save_upload
from ..utils.notifications import notify_application_received

router = APIRouter(prefix="/api/applications", tags=["Applications"])

@router.post("/", response_model=schemas.ApplicationResponse)
async def create_application(
    full_name: str = Form(...),
    date_of_birth: str = Form(...),
    gender: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    address: str = Form(...),
    city: str = Form(...),
    next_of_kin_name: str = Form(...),
    next_of_kin_phone: str = Form(...),
    id_type: str = Form(...),
    id_number: str = Form(...),
    vehicle_type: str = Form(...),
    plate_number: Optional[str] = Form(None),
    years_experience: str = Form(...),
    id_file: UploadFile = File(...),
    photo_file: UploadFile = File(...),
    vehicle_doc_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    application_id = f"SARE-{uuid.uuid4().hex[:6].upper()}"
    
    # Save files
    id_path = save_upload(id_file, application_id, "id_document")
    photo_path = save_upload(photo_file, application_id, "photo")
    vehicle_path = None
    if vehicle_doc_file:
        vehicle_path = save_upload(vehicle_doc_file, application_id, "vehicle_document")

    db_app = models.RiderApplication(
        application_id=application_id,
        full_name=full_name, date_of_birth=date_of_birth, gender=gender,
        phone=phone, email=email, address=address, city=city,
        next_of_kin_name=next_of_kin_name, next_of_kin_phone=next_of_kin_phone,
        id_type=id_type, id_number=id_number,
        id_document_path=id_path, photo_path=photo_path,
        vehicle_type=vehicle_type, plate_number=plate_number,
        vehicle_document_path=vehicle_path, years_experience=years_experience,
        status=models.ApplicationStatus.pending
    )
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Notify applicant
    notify_application_received(db_app)
    
    return db_app

@router.get("/status/{application_id}")
def check_status(application_id: str, phone: str, db: Session = Depends(get_db)):
    app = db.query(models.RiderApplication).filter(
        models.RiderApplication.application_id == application_id,
        models.RiderApplication.phone == phone
    ).first()
    if not app:
        raise HTTPException(404, "Application not found. Check your ID and phone number.")
    return {
        "application_id": app.application_id,
        "status": app.status,
        "submitted_at": app.submitted_at,
        "rejection_reason": app.rejection_reason
    }