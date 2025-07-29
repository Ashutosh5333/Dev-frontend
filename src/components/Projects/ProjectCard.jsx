import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentOnProject,
} from "../../redux/ProjectSlice/projectSlice";

export default function ProjectCard({ project, currentUserId, token }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    dispatch(
      commentOnProject({ projectId: project._id, text: commentText, token })
    );
    setCommentText("");
    setShowComments(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-start hover:shadow-md transition">
      {/* Left Side - User + Content */}
      <div className="flex-1 pr-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-2">
          {project.postedBy?.image ? (
            <img
              src={project.postedBy.image}
              alt={project.postedBy.name}
              className="w-10 h-10 rounded-full border border-gray-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold">
              {project.postedBy?.name?.[0] || "?"}
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900">
              {project.postedBy?.name || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3">{project.description}</p>

        {/* Actions */}
        <div className="flex gap-4 items-center mb-2">
         
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            💬 Comments ({project.comments.length})
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="mt-2">
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {project.comments.length === 0 ? (
                <p className="text-gray-400 text-sm">No comments yet.</p>
              ) : (
                project.comments.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700">
                      {c.postedBy?.name?.[0] || "U"}
                    </div>
                    <div className="border border-gray-200 px-3 py-1 rounded-lg flex-1 bg-white">
                      <p className="text-sm font-medium text-gray-800">
                        {c.postedBy?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-600">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
              >
                Add
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Right Side - Image */}
      {project.pic?.length > 0 && (
        <div className="w-32 h-28 flex-shrink-0">
          <img
            src={project.pic[0]}
            alt="project"
            className="w-full h-full object-cover rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  );
}
