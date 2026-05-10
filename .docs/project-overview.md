# MinLish — Tài Liệu Kỹ Thuật Dự Án

> **Phiên bản:** 1.0.0 | **Cập nhật:** 2026-05-10

---

## 1. Mô Tả Dự Án

**MinLish** là nền tảng học tiếng Anh trực tuyến tập trung vào ba kỹ năng cốt lõi: **Từ vựng**, **Listening** và **Shadowing**. Mục tiêu là giúp người học tiếng Anh đạt được độ lưu loát tự nhiên thông qua nội dung thực tế, đa dạng, kết hợp các phương pháp học hiện đại.

### 1.1. Tính Năng Chính

- **Luyện Nghe Chép Chính Tả (Dictation):** Rèn luyện kỹ năng nghe chi tiết từng từ với các mức độ từ dễ đến khó. Hệ thống chấm điểm tự động, hỗ trợ phát âm chậm và gợi ý từng ký tự.

- **Luyện Nói Shadowing:** Cải thiện phát âm, ngữ điệu và độ trôi chảy như người bản xứ. Cho phép ghi âm giọng người học và so sánh với bản gốc.

- **Học Từ Vựng qua Ngữ Cảnh:** Tích hợp flashcard và phương pháp lặp lại ngắt quãng (Spaced Repetition System — SRS) để ghi nhớ từ vựng lâu hơn. Từ vựng được học trong bối cảnh câu văn thực tế.

- **Nội dung đa dạng:** Bao gồm tin tức, giải trí, bài hát và các bài thi chuẩn quốc tế (IELTS / TOEIC / TOEFL).

### 1.2. Phân Quyền Người Dùng

| Role  | Mô tả |
|-------|-------|
| `user`  | Học viên — đăng ký, học bài, luyện tập, theo dõi tiến độ |
| `admin` | Quản trị viên — quản lý nội dung, bài học, người dùng, thống kê hệ thống |

---

## 2. Tech Stack
### 2.1. Backend

| Thành phần | Công nghệ | Ghi chú |
|-----------|-----------|---------|
| Runtime | Node.js (>= 20 LTS) | |
| Framework | Express.js (>= 5.x) | RESTful API |
| Authentication | JWT + Refresh Token | Access token: 15 phút, Refresh token: 7 ngày |
| Validation | Zod | Validate request trước khi vào service |
| ORM / Query Builder | Sequelize (MySQL) + Mongoose (MongoDB) | |
| Audio Processing | Multer + ffmpeg | Upload và xử lý file âm thanh |
| Scheduling | node-cron | Lên lịch nhắc nhở ôn tập SRS |

### 2.2. Frontend

| Thành phần | Công nghệ | Ghi chú |
|-----------|-----------|---------|
| Framework | Next.js (>= 14, App Router) | SSR + SSG |
| UI Library | Bootstrap CSS 5 | |
| State Management | Zustand | Client state |
| HTTP Client | Axios | Instance có interceptor token |
| Form | React Hook Form + Zod | |
| Audio | Web Audio API | Shadowing, Dictation player |

### 2.3. Database

| Database | Mục đích sử dụng |
|----------|-----------------|
| **MySQL** | Dữ liệu quan hệ |
| **MongoDB** | Dữ liệu phi quan hệ |

---

## 3. Chức Năng

### 3.1. Module Auth

| Chức năng | Role | Mô tả |
|-----------|------|-------|
| Đăng ký | Public | Tạo tài khoản mới |
| Đăng nhập | Public | Nhận access token + refresh token |
| Refresh token | Public | Cấp lại access token |
| Đăng xuất | User/Admin | Revoke refresh token |
| Đổi mật khẩu | User/Admin | Yêu cầu xác thực mật khẩu cũ |

### 3.2. Module User

| Chức năng | Role | Mô tả |
|-----------|------|-------|
| Xem hồ sơ cá nhân | User | Thông tin cơ bản, điểm kinh nghiệm |
| Cập nhật hồ sơ | User | Avatar, tên hiển thị, ngôn ngữ mục tiêu |
| Xem danh sách người dùng | Admin | Phân trang, filter, search |
| Khoá/Mở khoá tài khoản | Admin | |

### 3.3. Module Lesson (Bài Học)

| Chức năng | Role | Mô tả |
|-----------|------|-------|
| Xem danh sách bài học | User | Filter theo chủ đề, cấp độ, loại nội dung |
| Xem chi tiết bài học | User | Transcript, audio, subtitle |
| Tạo bài học | Admin | Upload audio/video, nhập transcript |
| Sửa / Xoá bài học | Admin | |
| Phân loại bài học | Admin | Gắn tag, level, category |

### 3.4. Module Dictation (Nghe Chép Chính Tả)

| Chức năng | Role | Mô tả |
|-----------|------|-------|
| Làm bài dictation | User | Nghe và gõ lại nội dung theo từng câu/đoạn |
| Nộp kết quả | User | Hệ thống chấm điểm tự động, hiển thị lỗi sai |
| Xem lịch sử làm bài | User | Điểm, thời gian, độ chính xác |
| Cài đặt độ khó | User | Số lần nghe lại, hiện/ẩn gợi ý |

### 3.5. Module Shadowing

| Chức năng | Role | Mô tả |
|-----------|------|-------|
| Xem hướng dẫn shadowing | User | Hiển thị transcript, điều khiển tốc độ audio |
| Ghi âm giọng người học | User | Sử dụng MediaRecorder API |
| So sánh giọng đọc | User | Phát song song bản gốc và bản ghi âm |
| Lưu bản ghi âm | User | Tối đa 10 bản mỗi bài |

### 3.6. Module Vocabulary (Từ Vựng — Flashcard + SRS)

| Chức năng | Role | Mô tả |
|-----------|------|-------|
| Xem bộ flashcard | User | Hiển thị từ, nghĩa, ví dụ trong ngữ cảnh |
| Thêm từ vào danh sách học | User | Lưu vào MongoDB |
| Ôn tập theo SRS | User | Hệ thống tính toán interval dựa trên SM-2 |
| Xem thống kê từ vựng | User | Tổng từ đã học, cần ôn, đã thành thạo |
| Quản lý bộ từ vựng | Admin | Thêm/sửa/xoá từ theo bài học |

### 3.7. Module Progress (Tiến Độ)

| Chức năng | Role | Mô tả |
|-----------|------|-------|
| Xem tiến độ học | User | Streak, điểm kinh nghiệm, bài đã hoàn thành |
| Xem thống kê tổng quan | Admin | DAU, bài học phổ biến, tỷ lệ hoàn thành |

---

## 4. Cấu Trúc Dự Án

### 4.1. Backend — Kiến Trúc 3 Tầng (RESTful API)

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js           # Kết nối MySQL (Sequelize)
│   │   ├── mongodb.js            # Kết nối MongoDB (Mongoose)
│   │   └── env.js                # Load & validate biến môi trường
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js    # Xác thực JWT
│   │   ├── role.middleware.js    # Kiểm tra phân quyền
│   │   ├── validate.middleware.js
│   │   └── errorHandler.js      # Global error handler
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.router.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.schema.js
│   │   ├── user/
│   │   ├── lesson/
│   │   ├── dictation/
│   │   ├── shadowing/
│   │   ├── vocabulary/
│   │   └── progress/
│   │
│   ├── models/
│   │   ├── mysql/                # Sequelize models
│   │   │   ├── User.js
│   │   │   ├── Lesson.js
│   │   │   ├── DictationResult.js
│   │   │   └── Progress.js
│   │   └── mongodb/              # Mongoose models
│   │       ├── Flashcard.js
│   │       ├── SRSCard.js
│   │       └── LessonContent.js
│   │
│   ├── utils/
│   │   ├── response.js           # Helper tạo response chuẩn
│   │   ├── AppError.js
│   │   ├── jwt.js
│   │   └── srs.js                # Thuật toán SM-2
│   │
│   └── app.js
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── package.json
└── server.js
```

**Luồng xử lý request:**

```
Request
  → Router
  → Validate Middleware (Zod)
  → Auth Middleware (JWT)
  → Role Middleware
  → Controller
  → Service
  → Model / DB
  → Response Helper
  → JSON Response
```

Mỗi tầng có trách nhiệm rõ ràng:

| Tầng | File | Trách nhiệm |
|------|------|------------|
| **Router** | `*.router.js` | Khai báo route, gắn middleware |
| **Controller** | `*.controller.js` | Parse request, gọi service, trả response |
| **Service** | `*.service.js` | Business logic, gọi model |
| **Model** | `models/` | Truy vấn database |

### 4.2. Frontend — Next.js App Router

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.jsx
│   │   │   └── register/page.jsx
│   │   ├── (main)/
│   │   │   ├── layout.jsx
│   │   │   ├── dashboard/page.jsx
│   │   │   ├── lessons/
│   │   │   │   ├── page.jsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.jsx
│   │   │   │       ├── dictation/page.jsx
│   │   │   │       └── shadowing/page.jsx
│   │   │   ├── vocabulary/
│   │   │   │   ├── page.jsx
│   │   │   │   └── review/page.jsx
│   │   │   └── profile/page.jsx
│   │   └── admin/
│   │       ├── layout.jsx
│   │       ├── page.jsx
│   │       ├── lessons/page.jsx
│   │       └── users/page.jsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── lesson/
│   │   ├── dictation/
│   │   ├── shadowing/
│   │   └── vocabulary/
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useAudioPlayer.js
│   │   └── useSRS.js
│   │
│   ├── services/
│   │   ├── axios.js              # Axios instance + interceptor
│   │   ├── auth.service.js
│   │   ├── lesson.service.js
│   │   └── vocabulary.service.js
│   │
│   ├── stores/
│   │   ├── useAuthStore.js
│   │   └── usePlayerStore.js
│   │
│   └── utils/
│       ├── formatTime.js
│       └── diffText.js
│
├── public/
├── .env.local.example
├── next.config.js
└── package.json
```

---

## 5. API Chuẩn

### 5.1. Nguyên Tắc Chung

- Tất cả response trả về `Content-Type: application/json`
- Mọi endpoint có cùng cấu trúc response body
- HTTP Status Code đúng ngữ nghĩa
- Mọi lỗi đều đi qua **global error handler**
- Mọi endpoint ghi dữ liệu (`POST`, `PUT`, `PATCH`, `DELETE`) phải **validate** request qua Zod middleware trước khi vào service

### 5.2. HTTP Status Code

| Code | Ý nghĩa | Khi dùng |
|------|---------|---------|
| `200` | OK | GET thành công, PUT/PATCH thành công |
| `201` | Created | POST tạo mới thành công |
| `204` | No Content | DELETE thành công (không trả body) |
| `400` | Bad Request | Validation lỗi, thiếu trường bắt buộc |
| `401` | Unauthorized | Chưa đăng nhập / token hết hạn |
| `403` | Forbidden | Đã đăng nhập nhưng không có quyền |
| `404` | Not Found | Resource không tồn tại |
| `409` | Conflict | Dữ liệu trùng lặp (email đã đăng ký...) |
| `422` | Unprocessable Entity | Dữ liệu hợp lệ về format nhưng sai nghiệp vụ |
| `500` | Internal Server Error | Lỗi server không xác định |

### 5.3. Cấu Trúc Response Body

**Success Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách bài học thành công",
  "data": {}
}
```

**Success Response có phân trang:**

```json
{
  "success": true,
  "message": "Lấy danh sách bài học thành công",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    {
      "field": "email",
      "message": "Email không đúng định dạng"
    }
  ]
}
```

> `errors` luôn là mảng. `field` chỉ có khi lỗi liên quan đến một trường cụ thể. Nếu là lỗi chung thì `errors: []`.

### 5.4. Cấu Trúc Endpoint

```
/api/v1/{resource}
/api/v1/{resource}/:id
/api/v1/{resource}/:id/{sub-resource}
```

**Ví dụ đầy đủ:**

```
GET    /api/v1/lessons                    # Danh sách bài học
GET    /api/v1/lessons/:id                # Chi tiết bài học
POST   /api/v1/lessons                    # Tạo bài học (Admin)
PUT    /api/v1/lessons/:id                # Cập nhật bài học (Admin)
DELETE /api/v1/lessons/:id                # Xoá bài học (Admin)
GET    /api/v1/lessons/:id/dictation      # Lấy dữ liệu dictation của bài
POST   /api/v1/dictation/submit           # Nộp kết quả dictation
```

### 5.5. Danh Sách API

#### Auth

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/logout
PUT    /api/v1/auth/change-password
```

#### User

```
GET    /api/v1/users/me
PUT    /api/v1/users/me
GET    /api/v1/users              (Admin)
PATCH  /api/v1/users/:id/status   (Admin)
```

#### Lesson

```
GET    /api/v1/lessons
GET    /api/v1/lessons/:id
POST   /api/v1/lessons            (Admin)
PUT    /api/v1/lessons/:id        (Admin)
DELETE /api/v1/lessons/:id        (Admin)
```

#### Dictation

```
GET    /api/v1/lessons/:id/dictation
POST   /api/v1/dictation/submit
GET    /api/v1/dictation/history
```

#### Shadowing

```
GET    /api/v1/lessons/:id/shadowing
POST   /api/v1/shadowing/recordings
GET    /api/v1/shadowing/recordings
```

#### Vocabulary

```
GET    /api/v1/vocabulary
POST   /api/v1/vocabulary
DELETE /api/v1/vocabulary/:id
GET    /api/v1/vocabulary/review
POST   /api/v1/vocabulary/review/result
```

#### Progress

```
GET    /api/v1/progress/me
GET    /api/v1/progress/stats     (Admin)
```

### 5.6. Global Error Handler

```js
// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
```

**AppError class:**

```js
// src/utils/AppError.js
class AppError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
  }
}

export default AppError;
```

**Validate middleware (Zod):**

```js
// src/middlewares/validate.middleware.js
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return next(new AppError('Dữ liệu không hợp lệ', 400, errors));
  }
  req.body = result.data;
  next();
};

export default validate;
```

**Response helper:**

```js
// src/utils/response.js
export const successResponse = (message, data = null) => ({
  success: true,
  message,
  ...(data !== null && { data }),
});
```

---