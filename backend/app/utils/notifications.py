import os
import logging

logger = logging.getLogger(__name__)

def send_email(to: str, subject: str, body: str):
    """
    Stub for transactional email (SendGrid / AWS SES).
    Replace with actual implementation when credentials are available.
    """
    logger.info(f"[EMAIL STUB] To: {to} | Subject: {subject} | Body: {body}")
    # In production:
    # sg = sendgrid.SendGridAPIClient(api_key=os.getenv("SENDGRID_API_KEY"))
    # ... construct and send ...

def send_sms(to: str, message: str):
    """
    Stub for SMS (Termii / Twilio).
    Replace with actual implementation when credentials are available.
    """
    logger.info(f"[SMS STUB] To: {to} | Message: {message}")
    # In production:
    # requests.post("https://api.ng.termii.com/api/sms/send", json={...})

def notify_application_received(app):
    subject = "Sare Express — Application Received"
    body = f"Hi {app.full_name}, we've received your rider application ({app.application_id}). We'll review it within 24-48 hours."
    send_email(app.email, subject, body)
    send_sms(app.phone, f"Sare Express: Application {app.application_id} received. We'll update you within 24-48 hrs.")

def notify_status_change(app):
    if app.status == "approved":
        subject = "Sare Express — You're approved!"
        body = f"Congratulations {app.full_name}! Your rider application has been approved. Welcome to Sare Express."
        send_email(app.email, subject, body)
        send_sms(app.phone, f"Sare Express: You're approved! Welcome aboard, {app.full_name}.")
    elif app.status == "rejected":
        subject = "Sare Express — Application Update"
        body = f"Hi {app.full_name}, unfortunately your application was not successful. Reason: {app.rejection_reason or 'N/A'}"
        send_email(app.email, subject, body)
        send_sms(app.phone, f"Sare Express: Your application was not successful. Reason: {app.rejection_reason or 'N/A'}")