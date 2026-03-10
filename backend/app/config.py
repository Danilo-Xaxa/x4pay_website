import os
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_FROM = os.getenv("RESEND_FROM", "X4PAY Assessoria <contato@x4payassessoria>")
EMAIL_TO = os.getenv("EMAIL_TO", "contato@x4payassessoria.com")

if not RESEND_API_KEY:
    raise RuntimeError("RESEND_API_KEY não definido no .env")
