# Tài liệu Frontend Pages

> Danh sách và chức năng của các trang (Page) đã được triển khai trên Frontend.
> Các trang đều nằm trong kiến trúc App Router của Next.js (thư mục `frontend/src/app`).

## 1. Public Pages (Các trang công khai)

| Route (Đường dẫn) | File | Chức năng hiện tại | Trạng thái |
|---|---|---|---|
| `/` | `app/page.jsx` | Trang chủ (Landing Page). Hiển thị giới thiệu hệ thống, có các nút điều hướng sang Đăng nhập và Đăng ký. | Cơ bản |
| `/login` | `app/(auth)/login/page.jsx` | Giao diện Đăng nhập. Có form validation (Email, Password) bằng Zod + React Hook Form. Tích hợp gọi API `/auth/login`. Có loading state, xử lý báo lỗi trực quan. Tự động chuyển hướng sang `/admin` hoặc `/profile` tuỳ Role sau khi đăng nhập thành công. | Hoàn thiện |
| `/register` | `app/(auth)/register/page.jsx` | Giao diện Đăng ký tài khoản mới. | Skeleton (Khung sườn) |

## 2. Protected Pages dành cho USER (Yêu cầu đăng nhập)

| Route (Đường dẫn) | File | Chức năng hiện tại | Trạng thái |
|---|---|---|---|
| `/profile` | `app/(main)/profile/page.jsx` | Trang Hồ sơ cá nhân. Lấy thông tin user từ `useAuthStore` và API `/user/profile`. Hiển thị thông tin (Avatar, Email, Bio...). Có bảo vệ: tự động văng ra `/login` nếu chưa đăng nhập. | Hoàn thiện |
| `/dashboard` | `app/(main)/dashboard/page.jsx` | Trang tổng quan tiến trình học của User. | Skeleton |
| `/lessons` | `app/(main)/lessons/page.jsx` | Trang hiển thị danh sách các bài học. | Skeleton |
| `/lessons/[id]` | `app/(main)/lessons/[id]/page.jsx` | Trang chi tiết một bài học cụ thể (Audio, Transcript). | Skeleton |
| `/lessons/[id]/dictation` | `app/(main)/lessons/[id]/dictation/page.jsx` | Giao diện làm bài tập Nghe chép chính tả cho một bài học. | Skeleton |
| `/lessons/[id]/shadowing` | `app/(main)/lessons/[id]/shadowing/page.jsx` | Giao diện Luyện nói Shadowing cho một bài học. | Skeleton |
| `/vocabulary` | `app/(main)/vocabulary/page.jsx` | Trang quản lý danh sách từ vựng. | Skeleton |
| `/vocabulary/review` | `app/(main)/vocabulary/review/page.jsx` | Giao diện ôn tập từ vựng bằng flashcard (SRS). | Skeleton |

## 3. Admin Pages dành cho ADMIN (Yêu cầu đăng nhập + Quyền Admin)

| Route (Đường dẫn) | File | Chức năng hiện tại | Trạng thái |
|---|---|---|---|
| `/admin` | `app/admin/page.jsx` | Trang Hồ sơ Quản trị viên (Admin Profile). Tự động gọi API `/admin/profile`. Hiển thị thông tin cá nhân của Admin (Avatar, Email, Phone...) với giao diện Dark Theme phân biệt với User. Có bảo vệ nghiêm ngặt: văng ra trang `/login` nếu chưa đăng nhập, hoặc chặn quyền truy cập (báo lỗi màn hình) nếu tài khoản chỉ có quyền USER. | Hoàn thiện |
| `/admin/lessons` | `app/admin/lessons/page.jsx` | Trang quản lý danh sách bài học (Thêm, Sửa, Xóa). | Skeleton |
| `/admin/users` | `app/admin/users/page.jsx` | Trang quản lý toàn bộ người dùng trong hệ thống. | Skeleton |

---
**Lưu ý:** Tất cả các luồng call API đều được đi qua Axios Interceptor (`services/axios.js`) để tự động gắn Access Token và tự động mồi gọi API `/auth/refresh-token` nếu bị lỗi 401. Dữ liệu đăng nhập được giữ bền vững bằng `zustand/middleware` qua Local Storage.
