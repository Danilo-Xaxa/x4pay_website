import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from email.message import EmailMessage
from aiosmtplib import send
from typing import Optional

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Lê as credenciais SMTP das variáveis de ambiente
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")  # Servidor SMTP (padrão Gmail)
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))  # Porta SMTP (587 para TLS)
SMTP_USER = os.getenv("SMTP_USER")  # Usuário SMTP (endereço de e-mail)
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  # Senha ou App Password do e-mail

# Verifica se as credenciais SMTP estão definidas corretamente
if not SMTP_USER:
    raise RuntimeError("A variável SMTP_USER precisa estar definida no arquivo .env")
if not SMTP_PASSWORD:
    raise RuntimeError("A variável SMTP_PASSWORD precisa estar definida no arquivo .env")

# Configuração básica de logging para registrar erros
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Inicializa a aplicação FastAPI
app = FastAPI()

# Modelo de validação do formulário de contato
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None  # Telefone opcional
    message: Optional[str] = None  # Mensagem opcional

@app.get("/")
def read_root():
    """
    Endpoint root para verificar se a API está funcionando corretamente.
    Retorna uma mensagem simples de boas-vindas.
    """
    return {"message": "Bem-vindo à API do website da X4Pay"}

@app.post("/contact")
async def contact(form: ContactForm):
    """
    Endpoint para processar o formulário de contato.
    Envia um e-mail com os dados preenchidos pelo usuário.
    """

    # Monta a estrutura do e-mail
    msg = EmailMessage()
    msg["From"] = SMTP_USER  # Remetente (o próprio e-mail configurado)
    msg["To"] = "xaxa@x4payassessoria.com"  # Destinatário (seu e-mail para receber contatos)
    msg["Subject"] = f"Contato de {form.name}"  # Assunto do e-mail

    # Corpo do e-mail formatado
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
            start_tls=True,  # Usa TLS para conexão segura
        )
        return {"detail": "Email enviado com sucesso!"}

    except Exception as e:
        logger.error(f"Erro ao enviar e-mail: {e}")  # Registra o erro no log
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao enviar e-mail: {str(e)}"
        )
