import logging

import requests

from app.config import EMAIL_TO, RESEND_API_KEY, RESEND_FROM

logger = logging.getLogger(__name__)


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
