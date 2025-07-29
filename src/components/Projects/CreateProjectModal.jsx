import React, { useState } from "react";
import { fetchProjects } from "../../redux/ProjectSlice/projectSlice";
import { useDispatch } from "react-redux";

export default function CreateProjectModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [pics, setPics] = useState("");
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      links: links
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
      pic: pics
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    });
    dispatch(fetchProjects());
    setTitle("");
    setDescription("");
    setLinks("");
    setPics("");
  };

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-8 py-8 relative flex flex-col gap-4 border border-gray-100"
        >
          {/* Title */}
          <h2 className="text-2xl mb-4 font-semibold text-gray-900 text-center">
            Create New Project
          </h2>

          {/* Title Field */}
          <label className="text-gray-700 font-medium text-sm">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            placeholder="Enter project title"
          />

          {/* Description Field */}
          <label className="text-gray-700 font-medium text-sm">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Write a short description..."
          />

          {/* Links Field */}
          <label className="text-gray-700 font-medium text-sm">
            Links (comma separated)
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            placeholder="https://example.com, https://github.com"
          />

          {/* Pictures Field */}
          <label className="text-gray-700 font-medium text-sm">
            Pictures URLs (comma separated)
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition"
            value={pics}
            onChange={(e) => setPics(e.target.value)}
            placeholder="https://image1.jpg, https://image2.jpg"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition font-medium shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
