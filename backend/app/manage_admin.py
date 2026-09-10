"""Create the configured administrator: python -m app.manage_admin.

Use --reset-password to explicitly apply the configured password to an existing
admin. Credentials are read from backend/.env and never printed.
"""
import argparse
import asyncio

from sqlalchemy import select

from app.core.config import settings
from app.core.database import AsyncSessionLocal, Base, engine
from app.core.security import hash_password
from app.models.user import User
from app.models import content, blog_project  # Register all tables.


async def provision(reset_password: bool = False) -> None:
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        async with AsyncSessionLocal() as db:
            user = await db.scalar(
                select(User).where(User.email == settings.ADMIN_EMAIL_DEFAULT)
            )
            if user is None:
                db.add(User(
                    email=settings.ADMIN_EMAIL_DEFAULT,
                    hashed_password=hash_password(settings.ADMIN_PASSWORD_DEFAULT),
                    full_name="Site Administrator",
                    is_active=True,
                    is_admin=True,
                ))
                await db.commit()
                print("Admin account created using backend/.env credentials.")
            elif not user.is_admin:
                raise RuntimeError("Configured email belongs to a non-admin account; no changes made.")
            elif reset_password:
                user.hashed_password = hash_password(settings.ADMIN_PASSWORD_DEFAULT)
                await db.commit()
                print("Existing admin password updated from backend/.env.")
            else:
                print("Admin already exists; password unchanged. Use --reset-password to update it.")
    finally:
        await engine.dispose()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--reset-password", action="store_true")
    asyncio.run(provision(parser.parse_args().reset_password))
