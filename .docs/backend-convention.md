**Controller** — chỉ xử lý request/response, không chứa business logic:

```js
export const getLessons = async (req, res, next) => {
  try {
    const data = await lessonService.getLessons(req.query);
    res.json(successResponse('Lấy danh sách bài học thành công', data));
  } catch (err) {
    next(err);
  }
};
```

**Service** — chứa toàn bộ business logic, không import `req`/`res`:

```js
export const getLessons = async ({ page = 1, limit = 10, level }) => {
  const offset = (page - 1) * limit;
  const where = level ? { level } : {};
  const { count, rows } = await Lesson.findAndCountAll({ where, limit, offset });
  return {
    items: rows,
    pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
  };
};
```

**Quy tắc bắt buộc:**

- Controller **không** chứa logic nghiệp vụ — chỉ parse request và trả response
- Service **không** import `req`, `res` — nhận data thuần
- Luôn `try/catch` trong controller, dùng `next(err)` để đẩy về global error handler
- Không dùng `console.log` trong production — dùng logger (pino hoặc winston)
- Không hard-code secret/URL — dùng `process.env`
- Mọi input từ client phải được validate trước khi xử lý