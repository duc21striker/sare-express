from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime
from .. import models, schemas
from ..database import get_db
from ..utils.notifications import notify_status_change

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# Note: In production, protect all routes below with JWT auth dependency

@router.get("/applications")
def list_applications(
    status: Optional[str] = None,
    city: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.RiderApplication)
    if status:
        query = query.filter(models.RiderApplication.status == status)
    if city:
        query = query.filter(models.RiderApplication.city == city)
    if search:
        query = query.filter(
            models.RiderApplication.full_name.ilike(f"%{search}%") |
            models.RiderApplication.phone.ilike(f"%{search}%")
        )
    return query.order_by(models.RiderApplication.submitted_at.desc()).all()

@router.get("/applications/{app_id}")
def get_application(app_id: int, db: Session = Depends(get_db)):
    app = db.query(models.RiderApplication).filter(models.RiderApplication.id == app_id).first()
    if not app:
        raise HTTPException(404, "Application not found")
    return app

@router.patch("/applications/{app_id}/status")
def update_status(app_id: int, update: schemas.ApplicationStatusUpdate, db: Session = Depends(get_db)):
    app = db.query(models.RiderApplication).filter(models.RiderApplication.id == app_id).first()
    if not app:
        raise HTTPException(404, "Application not found")
    
    if update.status == models.ApplicationStatus.rejected and not update.rejection_reason:
        raise HTTPException(400, "Rejection reason is required when rejecting an application")
    
    app.status = update.status
    app.rejection_reason = update.rejection_reason
    app.reviewed_at = datetime.utcnow()
    app.reviewed_by = "admin"  # Replace with actual admin user ID
    db.commit()
    db.refresh(app)
    
    notify_status_change(app)
    return app