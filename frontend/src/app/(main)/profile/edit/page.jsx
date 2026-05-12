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
  const [mounted, setMounted] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    gender: "",
    bio: "",
    birthday: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Giải phóng bộ nhớ preview URL tránh memory leak
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (!mounted) return;
    if (!user) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(`/user/profile`);
        const profile = res.data.data;

        setFormData({
          fullname: profile.profile?.fullname || "",
          phone: profile.profile?.phone || "",
          gender: profile.profile?.gender || "",
          bio: profile.profile?.bio || "",
          birthday: profile.profile?.birthday || "",
        });

        if (profile.imagePresignedUrl) {
          setPreview(profile.imagePresignedUrl);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [mounted, user?.id]); // user?.id tránh fetch khi user undefined khi load lại trang

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Kích thước ảnh quá lớn (tối đa 2MB)");
        return;
      }
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
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
      form.append("birthday", formData.birthday);

      if (avatar) {
        form.append("avatar", avatar);
      }

      await axiosInstance.post("/user/profile", form, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      });

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
            <label className="form-label">Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tiểu sử</label>

            <textarea
              className="form-control"
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <div className="text-center my-3">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  width="150"
                  height="150"
                  className="rounded-circle object-fit-cover border shadow-sm"
                />
              ) : (
                <div
                  className="bg-light rounded-circle d-inline-block border"
                  style={{ width: 150, height: 150 }}
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="form-control mt-2"
              onChange={handleFileChange}
            />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Avatar</label>

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                setAvatar(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                width="120"
                className="mt-2 rounded"
              />
            )}
          </div> */}

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
