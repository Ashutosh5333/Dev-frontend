import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateProjectModal from "../components/Projects/CreateProjectModal";
import ProjectCard from "../components/Projects/ProjectCard";
import {
  createProject,
  fetchProjects,
} from "../redux/ProjectSlice/projectSlice";
import Navbar from "../components/Navbar";
import { fetchUsers } from "../redux/userSlice/userSlice";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);
  const { user, token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchProjects());
      dispatch(fetchUsers());
    }
  }, [dispatch, token]);

  // console.log("users------->", users);

  const handleCreate = async (projectData) => {
    try {
      const res = await dispatch(
        createProject({
          project: { ...projectData, userId: user?._id },
          token,
        })
      );

      if (createProject.fulfilled.match(res)) {
        alert("✅ Project created successfully!");
        dispatch(fetchProjects());
        setShowModal(false);
      } else {
        alert(
          `❌ Failed to create project: ${
            res.payload || "Something went wrong"
          }`
        );
      }
    } catch (error) {
      alert("❌ An unexpected error occurred while creating the project.");
      console.log("error----->", error);
    }
  };

  const filteredProjects = projects?.filter(
    (p) =>
      p?.title?.toLowerCase().includes(search.toLowerCase()) ||
      p?.postedBy?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // console.log("projects------>",projects)

  return (
    <div className="min-h-screen bg-white pb-16">
      <Navbar search={search} setSearch={setSearch} />

      <div className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        {/* Left - Projects */}
        <div>
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              🚀 Projects Showcase
            </h1>
            <button
              className="rounded-lg bg-black text-white px-6 py-2.5 text-base font-medium hover:bg-gray-800 transition"
              onClick={() => setShowModal(true)}
            >
              ＋ New Project
            </button>
          </header>

          {loading && (
            <p className="text-center text-lg text-gray-500">
              Loading projects...
            </p>
          )}
          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}

          <main className="flex flex-col gap-8">
            {filteredProjects?.length === 0 && !loading ? (
              <p className="text-center text-lg text-gray-400">
                😕 No projects found.
              </p>
            ) : (
              filteredProjects?.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  currentUserId={user?._id}
                  token={token}
                />
              ))
            )}
          </main>
        </div>

        <aside className="hidden lg:block bg-gray-50 border border-gray-200 rounded-xl p-5 h-fit shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dev Connect Members
          </h2>
          <div className="space-y-3">
            {users?.map((member) => (
              <div key={member._id} className="flex items-center gap-3">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                    {member.name[0]}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {member?._id === user?._id ? "You" : "Member"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
