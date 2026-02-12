import os
import logging
import requests
from typing import Optional, Annotated, Literal

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field, StringConstraints
from dotenv import load_dotenv

# =========================================================
# ENV
# =========================================================
load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_FROM = os.getenv("RESEND_FROM", "X4PAY Assessoria <contato@x4payassessoria>")
EMAIL_TO = os.getenv("EMAIL_TO", "contato@x4payassessoria.com")

if not RESEND_API_KEY:
    raise RuntimeError("RESEND_API_KEY não definido no .env")

# =========================================================
# LOGGING
# =========================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("backend.log"), logging.StreamHandler()],
)

logger = logging.getLogger(__name__)

# =========================================================
# FASTAPI
# =========================================================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
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
# UTIL — ENVIO VIA RESEND (HTTP)
# =========================================================
def send_email_resend(subject: str, html: str, reply_to: str):
    response = requests.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "from": RESEND_FROM,
            "to": [EMAIL_TO],
            "subject": subject,
            "html": html,
            "reply_to": reply_to,
        },
        timeout=15,
    )

    if response.status_code >= 400:
        logger.error("Erro Resend: %s", response.text)
        raise RuntimeError("Falha ao enviar e-mail")

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
        content={"message": "API da X4PAY online"},
        media_type="application/json; charset=utf-8",
    )


@app.post("/contact")
async def contact(form: ContactForm):
    logger.info(f"Novo contato: {form.name} ({form.email})")

    html_body = f"""
    <html>
      <body>
        <h2>TEMOS UM NOVO CONTATO</h2>
        <p><strong>Nome:</strong> {form.name or '-'}</p>
        <p><strong>E-mail:</strong> {form.email}</p>
        <p><strong>Telefone:</strong> {form.phone or '-'}</p>
        <p><strong>Assunto:</strong> {form.subject or '-'}</p>
        <p><strong>Mensagem:</strong> {form.message or '-'}</p>
      </body>
    </html>
    """

    try:
        send_email_resend(
            subject="Novo contato via site da X4PAY",
            html=html_body,
            reply_to=form.email,
        )

        logger.info("E-mail enviado com sucesso (Resend).")

        return {
            "status": "success",
            "message": "E-mail enviado com sucesso!"
        }

    except Exception:
        logger.exception("Erro ao enviar e-mail")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "Erro ao enviar o e-mail."
            },
        )
