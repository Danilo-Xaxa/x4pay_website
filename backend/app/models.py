from typing import Annotated, Literal, Optional

from pydantic import BaseModel, EmailStr, Field, StringConstraints

PhoneStr = Annotated[str, StringConstraints(pattern=r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$")]


class ContactForm(BaseModel):
    name: Optional[str] = Field(max_length=100)
    email: EmailStr
    phone: Optional[PhoneStr] = None
    subject: Optional[Literal["", "Subadquirência", "Compliance", "Outros Assuntos"]] = None
    message: Optional[str] = Field(max_length=1000)


class ContatoX4AgroForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[PhoneStr] = None
    propriedade: Optional[str] = Field(None, max_length=100)
    message: Optional[str] = Field(None, max_length=1000)


class ApiResponse(BaseModel):
    success: bool
    message: str
