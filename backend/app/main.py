import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from email.message import EmailMessage
from aiosmtplib import send


# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Lê as credenciais SMTP das variáveis de ambiente
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")  # Servidor SMTP (padrão Gmail)
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))  # Porta SMTP (587 para TLS)
SMTP_USER = os.getenv("SMTP_USER")  # Usuário SMTP (endereço de e-mail)
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  # Senha ou App Password do e-mail

# Verifica se as credenciais foram carregadas corretamente
if not all([SMTP_USER, SMTP_PASSWORD]):
    raise RuntimeError("As variáveis SMTP_USER e SMTP_PASSWORD precisam estar definidas no arquivo .env")

# Inicializa a aplicação FastAPI
app = FastAPI()

# Modelo de validação do formulário de contato
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

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
    msg.set_content(
        f"Nome: {form.name}\n"
        f"E-mail: {form.email}\n\n"
        f"Mensagem:\n{form.message}"
    )

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
        # Captura erros de envio e retorna um erro HTTP 500
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao enviar e-mail: {str(e)}"
        )
