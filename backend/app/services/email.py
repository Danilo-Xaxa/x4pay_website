import logging
import time

import requests

from app.config import RESEND_API_KEY, RESEND_FROM, RESEND_TO

logger = logging.getLogger(__name__)

MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 2


def send_email_resend(subject: str, html: str, reply_to: str):
    last_error = None

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": RESEND_FROM,
                    "to": [RESEND_TO],
                    "subject": subject,
                    "html": html,
                    "reply_to": reply_to,
                },
                timeout=15,
            )

            if response.status_code < 400:
                logger.info("E-mail enviado com sucesso (tentativa %d)", attempt)
                return

            last_error = f"Resend HTTP {response.status_code}: {response.text}"
            logger.warning(
                "Falha ao enviar e-mail (tentativa %d/%d): %s",
                attempt,
                MAX_RETRIES,
                last_error,
            )
        except requests.RequestException as exc:
            last_error = str(exc)
            logger.warning(
                "Erro de rede ao enviar e-mail (tentativa %d/%d): %s",
                attempt,
                MAX_RETRIES,
                last_error,
            )

        if attempt < MAX_RETRIES:
            time.sleep(RETRY_DELAY_SECONDS * attempt)

    logger.error(
        "Falha definitiva ao enviar e-mail após %d tentativas: %s",
        MAX_RETRIES,
        last_error,
    )
    raise RuntimeError(f"Falha ao enviar e-mail após {MAX_RETRIES} tentativas")
