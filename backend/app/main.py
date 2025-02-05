import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, StringConstraints
from email.message import EmailMessage
from aiosmtplib import send
from typing import Optional, Annotated

# Carrega variáveis de ambiente do .env
load_dotenv()

# Configuração do SMTP
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
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
    allow_methods=["*"],
    allow_headers=["*"],
)

# Validação para número de telefone
PhoneStr = Annotated[str, StringConstraints(pattern=r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$")]

# Modelo do formulário de contato
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[PhoneStr] = None
    message: Optional[str] = None

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
    return {"message": "Bem-vindo à API do website da X4Pay"}

@app.post("/contact")
async def contact(form: ContactForm):
    """Processa o formulário de contato e envia um e-mail."""
    logger.info(f"Nova solicitação de contato recebida de {form.name} ({form.email})")

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
    msg["To"] = "xaxa@x4payassessoria.com"
    msg["Cc"] = "contato@x4payassessoria.com"  # Opcional: adicionar um e-mail em cópia
    msg["Subject"] = f"Contato de {form.name}"
    msg.set_content(email_content, subtype="html")

    try:
        await send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            start_tls=True,
        )
        logger.info(f"✅ E-mail enviado com sucesso para {form.email}")
        return {
            "status": "success",
            "message": "E-mail enviado com sucesso!"
        }

    except Exception as e:
        logger.error(f"❌ Erro ao enviar e-mail para {form.email}: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "Erro ao enviar e-mail. Tente novamente mais tarde."
            }
        )
