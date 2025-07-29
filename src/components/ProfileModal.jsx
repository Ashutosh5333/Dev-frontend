import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/AuthSlice/authSlice";

const ProfileModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
        github: user.socialLinks?.github || "",
        linkedin: user.socialLinks?.linkedin || "",
        twitter: user.socialLinks?.twitter || "",
        website: user.socialLinks?.website || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        website: formData.website,
      },
    };

    try {
      const resultAction = await dispatch(updateUserProfile(updatedData));

      if (updateUserProfile.fulfilled.match(resultAction)) {
        alert("✅ Profile updated successfully!");
        onClose();
      } else {
        alert(
          `❌ Failed to update profile: ${
            resultAction.payload || "Something went wrong"
          }`
        );
      }
    } catch (error) {
      alert("❌ An unexpected error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-7 border border-gray-100 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">
          Update Profile
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
            required
            disabled={true}
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Short bio..."
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
          />

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
          />

          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
          />
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
          />
          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="Twitter URL"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
          />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Personal Website"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 text-sm outline-none"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-sm shadow disabled:opacity-60"
            >
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
