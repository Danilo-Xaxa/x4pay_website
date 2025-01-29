import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, EmailStr
from email.message import EmailMessage
from aiosmtplib import send
from typing import Optional

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Lê as credenciais SMTP das variáveis de ambiente
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# Verifica se as credenciais SMTP estão definidas corretamente
if not SMTP_USER:
    raise RuntimeError("A variável SMTP_USER precisa estar definida no arquivo .env")
if not SMTP_PASSWORD:
    raise RuntimeError("A variável SMTP_PASSWORD precisa estar definida no arquivo .env")

# Configuração do logging
logging.basicConfig(
    level=logging.INFO,  # Define o nível de log (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format="%(asctime)s - %(levelname)s - %(message)s",  # Formato do log
    handlers=[
        logging.FileHandler("backend.log"),  # Salva logs no arquivo backend.log
        logging.StreamHandler()  # Exibe logs no terminal
    ]
)

logger = logging.getLogger(__name__)  # Instância do logger

# Inicializa a aplicação FastAPI
app = FastAPI()

# Modelo de validação do formulário de contato
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None  # Telefone opcional
    message: Optional[str] = None  # Mensagem opcional

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Middleware para registrar logs de cada requisição recebida."""
    logger.info(f"Recebida requisição: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Resposta enviada: {response.status_code}")
    return response

@app.get("/")
def read_root():
    """
    Endpoint root para verificar se a API está funcionando corretamente.
    Retorna uma mensagem simples de boas-vindas.
    """
    logger.info("GET / - API acessada com sucesso")
    return {"message": "Bem-vindo à API do website da X4Pay"}

@app.post("/contact")
async def contact(form: ContactForm):
    """
    Endpoint para processar o formulário de contato.
    Envia um e-mail com os dados preenchidos pelo usuário.
    """

    logger.info(f"Nova solicitação de contato de {form.name} ({form.email})")

    # Monta a estrutura do e-mail
    msg = EmailMessage()
    msg["From"] = SMTP_USER
    msg["To"] = "xaxa@x4payassessoria.com"
    msg["Subject"] = f"Contato de {form.name}"

    email_content = f"""
    Nome: {form.name}
    E-mail: {form.email}
    Telefone: {form.phone if form.phone else 'Nenhum telefone informado'}

    Mensagem:
    {form.message if form.message else 'Nenhuma mensagem enviada'}
    """
    msg.set_content(email_content)

    try:
        # Tenta enviar o e-mail via SMTP
        await send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            start_tls=True,
        )
        logger.info(f"E-mail enviado com sucesso para {form.email}")
        return {"detail": "Email enviado com sucesso!"}

    except Exception as e:
        logger.error(f"Erro ao enviar e-mail para {form.email}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao enviar e-mail: {str(e)}"
        )
