"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/services/axios";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user/profile?userId=${user.id}`);
        setProfile(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Không thể lấy thông tin user");
      }
    };
    fetchProfile();
  }, [user, router, mounted]);

  if (!mounted)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow">{error}</div>
      </div>
    );
  if (!profile)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <h2 className="text-primary fw-bold mb-4">Hồ Sơ Của Tôi</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={
                profile.profile?.avatar_url ||
                "https://ui-avatars.com/api/?name=" + profile.username
              }
              alt="Avatar"
              className="rounded-circle shadow"
              width="150"
              height="150"
            />
            <h4 className="mt-3 fw-bold">
              {profile.profile?.fullname || profile.username}
            </h4>
            <span className="badge bg-success">{profile.role}</span>
          </div>
          <div className="col-md-8 mt-4 mt-md-0">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Username:</strong> {profile.username}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {profile.email}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong>{" "}
                {profile.profile?.phone || "Chưa cập nhật"}
              </li>
              <li className="list-group-item">
                <strong>Giới tính:</strong>{" "}
                {profile.profile?.gender === "MALE"
                  ? "Nam"
                  : profile.profile?.gender === "FEMALE"
                    ? "Nữ"
                    : "Chưa cập nhật"}
              </li>
              <li className="list-group-item">
                <strong>Bio:</strong> {profile.profile?.bio || "Chưa cập nhật"}
              </li>
            </ul>

            <div className="mt-4 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => router.push("/profile/edit")}
              >
                Cập nhật hồ sơ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
