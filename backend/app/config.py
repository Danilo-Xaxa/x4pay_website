import os
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_FROM = os.getenv("RESEND_FROM", "contato@x4payassessoria.com")
RESEND_TO = os.getenv("RESEND_TO", "contato@x4payassessoria.com")

if not RESEND_API_KEY:
    raise RuntimeError("RESEND_API_KEY não definido no .env")
