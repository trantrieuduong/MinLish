```jsx
// Component: PascalCase, mỗi file một component default
const LessonCard = ({ lesson, onSelect }) => {
  return (
    <div className="card" onClick={() => onSelect(lesson.id)}>
      <h5 className="card-title">{lesson.title}</h5>
      <span className="badge bg-primary">{lesson.level}</span>
    </div>
  );
};

export default LessonCard;
```

**Quy tắc:**

- Mỗi component trong 1 file riêng, đặt tên `PascalCase`
- Custom hook bắt đầu bằng `use`: `useAudioPlayer`, `useSRS`, `useAuth`
- Service call (axios) chỉ nằm trong `services/` hoặc custom hook — không gọi thẳng trong JSX
- Không dùng `console.log` trong production
- Dùng `"use client"` directive đúng nơi — server component là mặc định trong App Router