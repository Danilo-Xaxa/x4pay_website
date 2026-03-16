import logging
from html import escape

from fastapi import APIRouter, Request

from app.limiter import limiter
from app.models import ApiResponse, ContactForm, ContatoX4AgroForm
from app.services.email import send_email_resend

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/contact", response_model=ApiResponse)
@limiter.limit("5/minute")
async def contact(request: Request, form: ContactForm):
    logger.info("Novo contato recebido")

    safe_name = escape(form.name) if form.name else "-"
    safe_email = escape(form.email)
    safe_phone = escape(form.phone) if form.phone else "-"
    safe_subject = escape(form.subject) if form.subject else "-"
    safe_message = escape(form.message) if form.message else "-"

    html_body = f"""
    <html>
      <body>
        <p><strong>Nome:</strong> {safe_name}</p>
        <p><strong>E-mail:</strong> {safe_email}</p>
        <p><strong>Telefone:</strong> {safe_phone}</p>
        <p><strong>Assunto:</strong> {safe_subject}</p>
        <p><strong>Mensagem:</strong> {safe_message}</p>
      </body>
    </html>
    """

    try:
        send_email_resend("Novo contato via site da X4PAY", html_body, form.email)
    except RuntimeError:
        logger.error("Falha ao enviar e-mail de contato de %s", safe_email)
        return ApiResponse(success=False, message="Erro ao enviar mensagem. Tente novamente em alguns minutos.")

    return ApiResponse(success=True, message="Mensagem recebida com sucesso!")


@router.post("/contact_x4agro", response_model=ApiResponse)
@limiter.limit("5/minute")
async def contato_x4agro(request: Request, form: ContatoX4AgroForm):
    logger.info("Novo contato X4AGRO recebido")

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
        send_email_resend("Novo contato via site da X4AGRO", html_body, form.email)
    except RuntimeError:
        logger.error("Falha ao enviar e-mail X4AGRO de %s", safe_email)
        return ApiResponse(success=False, message="Erro ao enviar mensagem. Tente novamente em alguns minutos.")

    return ApiResponse(success=True, message="Contato recebido com sucesso!")
