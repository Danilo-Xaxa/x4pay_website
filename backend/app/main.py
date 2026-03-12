import logging
from logging.handlers import RotatingFileHandler

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.routes.health import router as health_router
from app.routes.contact import router as contact_router

# =========================================================
# LOGGING
# =========================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        RotatingFileHandler("backend.log", maxBytes=5_000_000, backupCount=5),
        logging.StreamHandler(),
    ],
)

logger = logging.getLogger(__name__)

# =========================================================
# FASTAPI + RATE LIMITING
# =========================================================
limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://x4paywebsite-production.up.railway.app",
        "https://x4paywebsite-production.up.railway.app",
        "http://x4payassessoria.com",
        "https://x4payassessoria.com",
        "http://www.x4payassessoria.com",
        "https://www.x4payassessoria.com",
        "https://x4agrocompliance.com",
        "https://www.x4agrocompliance.com",
        "https://site-x4agro.vercel.app/",
    ],
    allow_origin_regex=r"https://(x4pay|x4agro).*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

# =========================================================
# MIDDLEWARE LOG
# =========================================================
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info("[%s] %s %s", request.client.host, request.method, request.url)
    response = await call_next(request)
    logger.info("Resposta enviada: %s", response.status_code)
    return response

# =========================================================
# ROTAS
# =========================================================
app.include_router(health_router)
app.include_router(contact_router)
