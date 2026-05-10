
## Authentication

- Dùng JWT access token (in memory )và refresh token (HTTP cookie only).
- Access token sống ngắn, ví dụ 15 phút.
- Refresh token sống dài hơn, ví dụ 7 ngày.

## Rate limit cho login và signup

Bắt buộc áp dụng rate limit cho các endpoint sau:

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`