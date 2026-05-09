from __future__ import annotations

from google.auth.transport import requests
from google.oauth2 import id_token

from app.core.config import get_settings

settings = get_settings()


def verify_google_credential(credential: str) -> dict:
    if not settings.google_client_id:
        raise ValueError("Google OAuth is not configured")

    token_info = id_token.verify_oauth2_token(
        credential,
        requests.Request(),
        settings.google_client_id,
    )
    if token_info.get("email") is None:
        raise ValueError("Google account email is missing")
    return token_info
