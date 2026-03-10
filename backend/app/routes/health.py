from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/")
def read_root():
    return JSONResponse(
        content={"message": "API da X4PAY online"},
        media_type="application/json; charset=utf-8",
    )
