import os
import logging
import requests
from html import escape
from typing import Optional, Annotated, Literal

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field, StringConstraints
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

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
# FASTAPI + RATE LIMITING
# =========================================================
limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
        "https://x4agrocompliance.com",
        "https://www.x4agrocompliance.com",
        "https://site-x4agro.vercel.app/",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
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


class ContatoX4AgroForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    propriedade: Optional[str] = Field(None, max_length=100)
    message: Optional[str] = Field(None, max_length=1000)

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
@limiter.limit("5/minute")
async def contact(request: Request, form: ContactForm):
    logger.info(f"Novo contato: {form.name} ({form.email})")

    safe_name = escape(form.name) if form.name else "-"
    safe_email = escape(form.email)
    safe_phone = escape(form.phone) if form.phone else "-"
    safe_subject = escape(form.subject) if form.subject else "-"
    safe_message = escape(form.message) if form.message else "-"

    html_body = f"""
    <html>
      <body>
        <h2>TEMOS UM NOVO CONTATO</h2>
        <p><strong>Nome:</strong> {safe_name}</p>
        <p><strong>E-mail:</strong> {safe_email}</p>
        <p><strong>Telefone:</strong> {safe_phone}</p>
        <p><strong>Assunto:</strong> {safe_subject}</p>
        <p><strong>Mensagem:</strong> {safe_message}</p>
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


@app.post("/contact_x4agro")
@limiter.limit("5/minute")
async def contato_x4agro(request: Request, form: ContatoX4AgroForm):
    logger.info("Novo contato X4AGRO: %s (%s)", form.name, form.email)

    safe_name = escape(form.name)
    safe_email = escape(form.email)
    safe_phone = escape(form.phone) if form.phone else None
    safe_propriedade = escape(form.propriedade) if form.propriedade else None
    safe_message = escape(form.message) if form.message else None

    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A1A1A;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2A5936 0%, #3B8C4A 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">X4AGRO</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Novo contato do site da X4AGRO</p>
          </div>
          <div style="background: #F2F2F2; padding: 30px; border-radius: 0 0 8px 8px;">
            <p><strong style="color: #2A5936;">Nome:</strong> {safe_name}</p>
            <p><strong style="color: #2A5936;">E-mail:</strong> <a href="mailto:{safe_email}">{safe_email}</a></p>
            {"<p><strong style='color: #2A5936;'>Telefone:</strong> " + safe_phone + "</p>" if safe_phone else ""}
            {"<p><strong style='color: #2A5936;'>Propriedade:</strong> " + safe_propriedade + "</p>" if safe_propriedade else ""}
            {"<p><strong style='color: #2A5936;'>Mensagem:</strong> " + safe_message + "</p>" if safe_message else ""}
          </div>
          <p style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">
            Enviado pelo formulário de contato em x4agrocompliance.com
          </p>
        </div>
      </body>
    </html>
    """

    try:
        send_email_resend(
            subject=f"Novo contato via site da X4AGRO",
            html=html_body,
            reply_to=form.email,
        )

        logger.info("E-mail X4AGRO enviado com sucesso (Resend).")

        return {
            "success": True,
            "message": "Contato enviado com sucesso!",
        }

    except Exception:
        logger.exception("Erro ao enviar e-mail X4AGRO")
        raise HTTPException(
            status_code=500,
            detail="Erro ao enviar e-mail. Tente novamente mais tarde.",
        )
