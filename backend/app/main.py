import os
import ssl
import logging
from email.message import EmailMessage
from typing import Optional, Annotated, Literal
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel, EmailStr, Field, StringConstraints
from dotenv import load_dotenv
import smtplib

# =========================================================
# ENV
# =========================================================
load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.zoho.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

if not SMTP_USER or not SMTP_PASSWORD:
    raise RuntimeError("SMTP_USER e SMTP_PASSWORD precisam estar definidos no .env")

# =========================================================
# LOGGING
# =========================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("backend.log"), logging.StreamHandler()]
)

logger = logging.getLogger(__name__)

# =========================================================
# FASTAPI
# =========================================================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://x4paywebsite-production.up.railway.app",
        "https://x4paywebsite-production.up.railway.app",
        "http://x4payassessoria.com",
        "https://x4payassessoria.com",
        "http://www.x4payassessoria.com",
        "https://www.x4payassessoria.com",
    ],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# =========================================================
# MODELS
# =========================================================
PhoneStr = Annotated[str, StringConstraints(pattern=r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$")]

class ContactForm(BaseModel):
    name: Optional[str] = Field(max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[Literal["", "Subadquirência", "Compliance", "Outros Assuntos"]] = None
    message: Optional[str] = Field(max_length=1000)

# =========================================================
# UTIL: envio SMTP (sincrono, seguro)
# =========================================================
def send_email(msg: EmailMessage):
    context = ssl.create_default_context()

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)

# =========================================================
# MIDDLEWARE LOG
# =========================================================
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"[{request.client.host}] {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Resposta enviada: {response.status_code}")
    return response

# =========================================================
# ROTAS
# =========================================================
@app.get("/")
def read_root():
    return JSONResponse(
        content={"message": "Bem-vindo à API do site da X4PAY"},
        media_type="application/json; charset=utf-8"
    )


@app.post("/contact")
async def contact(form: ContactForm):
    logger.info(f"Nova solicitação de contato: {form.name} ({form.email})")

    html_body = f"""
    <html>
      <body>
        <h2>*TEMOS UM NOVO CONTATO*</h2>
        <p><strong>Nome:</strong> {form.name or '-'}</p>
        <p><strong>E-mail:</strong> {form.email}</p>
        <p><strong>Telefone:</strong> {form.phone or '-'}</p>
        <p><strong>Assunto:</strong> {form.subject or '-'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>{form.message or '-'}</p>
      </body>
    </html>
    """

    msg = EmailMessage()
    msg["From"] = f"X4PAY Assessoria <{SMTP_USER}>"
    msg["To"] = "contato@x4payassessoria.com"
    msg["Cc"] = "xaxa@x4payassessoria.com"
    msg["Reply-To"] = form.email
    msg["Subject"] = "Novo contato via website"
    msg.set_content(html_body, subtype="html")

    try:
        await run_in_threadpool(send_email, msg)

        logger.info("E-mail enviado com sucesso via Zoho.")
        return {"status": "success", "message": "Mensagem enviada com sucesso!"}

    except Exception as e:
        logger.exception("Erro ao enviar e-mail")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "Erro ao enviar o e-mail."
            }
        )
