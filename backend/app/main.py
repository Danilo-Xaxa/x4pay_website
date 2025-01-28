from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from email.message import EmailMessage
from aiosmtplib import send

app = FastAPI()

# Pydantic model for contact form validation
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/")
def read_root():
    """
    Simple root endpoint to confirm the API is running.
    """
    return {"message": "Bem-vindo à API do website da X4Pay"}

@app.post("/contact")
async def contact(form: ContactForm):
    """
    Endpoint for receiving contact form submissions.
    It sends an email with the provided data.
    """

    # Create the email
    msg = EmailMessage()
    msg["From"] = "no-reply@example.com"  # Could be the same as your SMTP user
    msg["To"] = "youremail@example.com"   # Where you want to receive the form data
    msg["Subject"] = f"Contact Form Submission from {form.name}"

    msg.set_content(
        f"Name: {form.name}\n"
        f"Email: {form.email}\n\n"
        f"Message:\n{form.message}"
    )

    try:
        # Send the email via your SMTP server
        await send(
            msg,
            hostname="smtp.gmail.com",
            port=587,
            username="daniloxaxa01@gmail.com",
            password="...", # ?????????????????
            start_tls=True,
        )
        return {"detail": "Email sent successfully!"}

    except Exception as e:
        # If something fails, raise a 500 HTTP exception
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while sending the email: {str(e)}"
        )
