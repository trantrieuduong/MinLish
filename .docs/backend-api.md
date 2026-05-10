# Tài liệu Backend API

> Danh sách và chức năng của các API đã được khởi tạo trong Backend.
> Prefix mặc định cho tất cả API: `/api/v1`

## 1. Module Auth (`/auth`)

| Method | Endpoint | Quyền (Role) | Chức năng | Body / Params | Trạng thái |
|---|---|---|---|---|---|
| `POST` | `/auth/login` | Public | Xác thực đăng nhập. So sánh Password với `bcrypt`. Áp dụng Rate Limit (5 req / 15p). Trả về Access Token (JSON) và thiết lập Refresh Token vào `HttpOnly Cookie`. | `email`, `password` | Hoàn thiện |
| `POST` | `/auth/refresh` | Public | Nhận và xác thực `refreshToken` từ Cookie. Nếu hợp lệ, tự động sinh ra một `accessToken` mới trả về JSON để Client sử dụng. | Yêu cầu kèm theo Cookie. | Hoàn thiện |
| `POST` | `/auth/register` | Public | Đăng ký tài khoản người dùng mới. Có Rate Limit. | `email`, `password` | Skeleton (Khung) |

## 2. Module User (`/user`)

| Method | Endpoint | Quyền (Role) | Chức năng | Trạng thái |
|---|---|---|---|---|
| `GET` | `/user/profile` | USER / ADMIN | Lấy thông tin cá nhân của tài khoản đang đăng nhập (kèm theo bảng liên kết `UserProfile`). Loại bỏ mật khẩu băm khi trả về. | Hoàn thiện |

## 3. Module Admin (`/admin`)

| Method | Endpoint | Quyền (Role) | Chức năng | Trạng thái |
|---|---|---|---|---|
| `GET` | `/admin/profile` | ADMIN | Lấy thông tin cá nhân của tài khoản Admin đang đăng nhập. Cấm hoàn toàn quyền truy cập của `USER`. | Hoàn thiện |

## 4. Các Module Khác (Chưa implement logic)

Các module dưới đây hiện tại đã được tạo sẵn file Router, Controller và Service nhưng chưa có logic cụ thể (Skeleton):

- **Lesson (`/lesson`)**: Quản lý bài học.
- **Dictation (`/dictation`)**: Quản lý bài làm nghe chép chính tả.
- **Shadowing (`/shadowing`)**: Quản lý bản thu âm luyện nói.
- **Vocabulary (`/vocabulary`)**: Quản lý từ vựng và thuật toán SRS.
- **Progress (`/progress`)**: Tính toán điểm số, chuỗi (streak).

---
**Quy tắc chung:**
- Mọi API có dữ liệu gửi lên đều đi qua middleware validation (sử dụng `zod`).
- Mọi API ngoại trừ `/auth` đều yêu cầu `Authorization: Bearer <accessToken>` trên Header.
- Mọi lỗi phát sinh đều được gom về một mối xử lý thông qua `errorHandler.js`, trả về JSON đúng chuẩn.
