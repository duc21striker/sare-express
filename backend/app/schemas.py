from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from .models import ApplicationStatus

class ApplicationCreate(BaseModel):
    full_name: str
    date_of_birth: str
    gender: str
    phone: str
    email: EmailStr
    address: str
    city: str
    next_of_kin_name: str
    next_of_kin_phone: str
    id_type: str
    id_number: str
    vehicle_type: str
    plate_number: Optional[str] = None
    years_experience: str

class ApplicationResponse(BaseModel):
    application_id: str
    status: ApplicationStatus
    submitted_at: datetime

    class Config:
        from_attributes = True

class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus
    rejection_reason: Optional[str] = None