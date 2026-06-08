import DictationPage from "./dictation/page";

export default function LessonDetailPage({ params }) {
  return (
    <div>
      <h2 className="text-center mt-4">Chi Tiết Bài Học {params.id}</h2>
      <DictationPage />
    </div>
  );
}
