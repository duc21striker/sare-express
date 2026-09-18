from sqlalchemy import Column, Integer, String, DateTime, Enum, Text
from sqlalchemy.sql import func
from .database import Base
import enum

class ApplicationStatus(str, enum.Enum):
    pending = "pending"
    under_review = "under_review"
    approved = "approved"
    rejected = "rejected"

class RiderApplication(Base):
    __tablename__ = "rider_applications"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    date_of_birth = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    address = Column(Text, nullable=False)
    city = Column(String, nullable=False)
    next_of_kin_name = Column(String, nullable=False)
    next_of_kin_phone = Column(String, nullable=False)
    id_type = Column(String, nullable=False)
    id_number = Column(String, nullable=False)
    id_document_path = Column(String, nullable=True)
    photo_path = Column(String, nullable=True)
    vehicle_type = Column(String, nullable=False)
    plate_number = Column(String, nullable=True)
    vehicle_document_path = Column(String, nullable=True)
    years_experience = Column(String, nullable=False)
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.pending)
    rejection_reason = Column(Text, nullable=True)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    reviewed_by = Column(String, nullable=True)