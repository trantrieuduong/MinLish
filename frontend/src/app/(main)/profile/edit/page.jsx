"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axios";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    gender: "",
    bio: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user/profile?userId=${user.id}`);

        const profile = res.data.data;

        setFormData({
          fullname: profile.profile?.fullname || "",
          phone: profile.profile?.phone || "",
          gender: profile.profile?.gender || "",
          bio: profile.profile?.bio || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      const form = new FormData();

      form.append("userId", user.id);
      form.append("fullname", formData.fullname);
      form.append("phone", formData.phone);
      form.append("gender", formData.gender);
      form.append("bio", formData.bio);

      await axiosInstance.post("/user/put-profile", form);

      setSuccess("Cập nhật hồ sơ thành công");

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow border-0 rounded-4 p-4">
        <h2 className="fw-bold text-primary mb-4">Cập Nhật Hồ Sơ</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Họ tên</label>

            <input
              type="text"
              className="form-control"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>

            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Giới tính</label>

            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Bio</label>

            <textarea
              className="form-control"
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Lưu thay đổi
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.push("/profile")}
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
