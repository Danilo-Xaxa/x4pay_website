import os
import logging
import asyncio
from aiosmtplib import SMTP
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, StringConstraints, Field
from email.message import EmailMessage
from typing import Optional, Annotated

# Carrega variaveis de ambiente do .env
load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.sendgrid.net")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))  # 465 para SSL ou 587 para STARTTLS
SMTP_USER = os.getenv("SMTP_USER", "apikey")  # O usuario sempre eh "apikey" no SendGrid
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  # A API Key gerada no SendGrid

if not SMTP_PASSWORD:
    raise RuntimeError("A variavel SMTP_PASSWORD precisa estar definida no arquivo .env")

# Configuracao de logs
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("backend.log"), logging.StreamHandler()]
)

logger = logging.getLogger(__name__)

# Inicializa FastAPI
app = FastAPI()

# Configuracao de CORS para permitir chamadas do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://x4paywebsite-production.up.railway.app", "https://x4paywebsite-production.up.railway.app", "http://x4payassessoria.com", "https://x4payassessoria.com", "http://www.x4payassessoria.com", "https://www.x4payassessoria.com"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# Validacao para numero de telefone
PhoneStr = Annotated[str, StringConstraints(pattern=r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$")]

# Modelo do formulario de contato
class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nome do usuario")
    email: EmailStr
    phone: Optional[PhoneStr] = None
    message: Optional[str] = Field(None, max_length=1000, description="Mensagem opcional")

# Middleware para log de requisicoes
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"[{request.client.host}] {request.method} {request.url} recebida com sucesso!")
    response = await call_next(request)
    logger.info(f"Resposta enviada: {response.status_code}")
    return response

@app.get("/")
def read_root():
    """Verifica se a API esta funcionando."""
    logger.info("GET / - API acessada com sucesso")
    return JSONResponse(content={"message": "Bem-vindo a API do website da X4Pay"}, media_type="application/json; charset=utf-8")

@app.post("/contact")
async def contact(form: ContactForm):
    """Processa o formulario e envia um e-mail via SendGrid"""

    logger.info(f"Nova solicitacao de contato de {form.name} ({form.email})")

    # Estrutura do e-mail em HTML
    email_content = f"""
    <html>
    <body>
        <h2>Novo contato via site da X4PAY</h2>
        <p><strong>Nome:</strong> {form.name}</p>
        <p><strong>E-mail:</strong> {form.email}</p>
        <p><strong>Telefone:</strong> {form.phone if form.phone else '-'}</p>
        <p><strong>Mensagem:</strong> {form.message if form.message else '-'}</p>
    </body>
    </html>
    """

    # Configuracao do e-mail
    msg = EmailMessage()
    msg["From"] = f"X4Pay Assessoria <contato@x4payassessoria.com>"  # O dominio autenticado no SendGrid
    msg["To"] = "contato@x4payassessoria.com"
    msg["Cc"] = "xaxa@x4payassessoria.com"
    msg["Subject"] = f"Novo contato!"
    msg.set_content(email_content, subtype="html")

    try:
        # Conectar ao servidor SendGrid
        async with SMTP(hostname=SMTP_HOST, port=SMTP_PORT, start_tls=True) as smtp:
            await smtp.login(SMTP_USER, SMTP_PASSWORD)
            await smtp.send_message(msg)

        logger.info(f"E-mail enviado com sucesso para contato@x4payassessoria.com")
        return {"status": "success", "message": "E-mail enviado com sucesso!"}

    except asyncio.TimeoutError:
        logger.error("Tempo limite excedido ao tentar enviar o e-mail.")
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": "Tempo limite excedido ao enviar o e-mail."}
        )

    except Exception as e:
        logger.error(f"Erro ao enviar e-mail para contato@x4payassessoria.com: {e}")
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": f"Erro ao enviar e-mail: {str(e)}"}
        )
