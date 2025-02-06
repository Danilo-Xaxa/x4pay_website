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

# Carrega variáveis de ambiente do .env
load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))  # Gmail usa 587 para STARTTLS
SMTP_USER = os.getenv("SMTP_USER", "x4payassessoria@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

if not SMTP_USER or not SMTP_PASSWORD:
    raise RuntimeError("As variáveis SMTP_USER e SMTP_PASSWORD precisam estar definidas no arquivo .env")

# Configuração de logs
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("backend.log"), logging.StreamHandler()]
)

logger = logging.getLogger(__name__)

# Inicializa FastAPI
app = FastAPI()

# Configuração de CORS para permitir chamadas do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajuste para ["https://x4payassessoria.com"] em produção
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# Validação para número de telefone
PhoneStr = Annotated[str, StringConstraints(pattern=r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$")]

# Modelo do formulário de contato
class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nome do usuário")
    email: EmailStr
    phone: Optional[PhoneStr] = None
    message: Optional[str] = Field(None, max_length=1000, description="Mensagem opcional")

# Middleware para log de requisições
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"📩 [{request.client.host}] {request.method} {request.url} recebida")
    response = await call_next(request)
    logger.info(f"Resposta enviada: {response.status_code}")
    return response

@app.get("/")
def read_root():
    """Verifica se a API está funcionando."""
    logger.info("GET / - API acessada com sucesso")
    return JSONResponse(content={"message": "Bem-vindo à API do website da X4Pay"}, media_type="application/json; charset=utf-8")

@app.post("/contact")
async def contact(form: ContactForm):
    """Processa o formulário e envia um e-mail via Gmail"""

    logger.info(f"📩 Nova solicitação de contato de {form.name} ({form.email})")

    # Estrutura do e-mail em HTML
    email_content = f"""
    <html>
    <body>
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> {form.name}</p>
        <p><strong>E-mail:</strong> {form.email}</p>
        <p><strong>Telefone:</strong> {form.phone if form.phone else 'Nenhum telefone informado'}</p>
        <p><strong>Mensagem:</strong> {form.message if form.message else 'Nenhuma mensagem enviada'}</p>
    </body>
    </html>
    """

    # Configuração do e-mail
    msg = EmailMessage()
    msg["From"] = SMTP_USER
    msg["To"] = "contato@x4payassessoria.com"
    msg["Subject"] = f"Contato de {form.name}"
    msg.set_content(email_content, subtype="html")

    try:
        # Conectar ao servidor Gmail via STARTTLS
        async with SMTP(hostname=SMTP_HOST, port=SMTP_PORT) as smtp:
            await smtp.connect(timeout=10)
            await smtp.starttls()  # Necessário para Gmail
            await smtp.login(SMTP_USER, SMTP_PASSWORD)
            await smtp.send_message(msg)

        logger.info(f"✅ E-mail enviado com sucesso para {form.email}")
        return {"status": "success", "message": "E-mail enviado com sucesso!"}

    except asyncio.TimeoutError:
        logger.error("⏳ Tempo limite excedido ao tentar enviar o e-mail.")
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": "Tempo limite excedido ao enviar o e-mail."}
        )

    except Exception as e:
        logger.error(f"❌ Erro ao enviar e-mail para {form.email}: {e}")
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": f"Erro ao enviar e-mail: {str(e)}"}
        )
