from pydantic_settings import BaseSettings
from pydantic import Field
from typing import List
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Shoshos Oil and Gas Intl. Limited API"
    DEBUG: bool = Field(default=False, validation_alias="APP_DEBUG")
    SECRET_KEY: str = "change-this-to-a-secure-random-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database
    DATABASE_URL: str = f"sqlite+aiosqlite:///{(BACKEND_DIR / 'shoshos.db').as_posix()}"

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3100",
        "https://shoshosltd.com",
        "https://www.shoshosltd.com",
    ]

    # Email (SendGrid)
    SENDGRID_API_KEY: str = ""
    FROM_EMAIL: str = "noreply@shoshosltd.com"
    ADMIN_EMAIL: str = "admin@shoshosltd.com"

    # Admin
    ADMIN_EMAIL_DEFAULT: str = "admin@shoshosltd.com"
    ADMIN_PASSWORD_DEFAULT: str = "ChangeMe123!"
    ADMIN_SEED_SECRET: str = "default-insecure-secret"

    class Config:
        env_file = str(BACKEND_DIR / ".env")
        case_sensitive = True

settings = Settings()
