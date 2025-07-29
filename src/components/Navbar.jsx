import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUserProfile } from "../redux/AuthSlice/authSlice";
import ProfileModal from "./ProfileModal";

const Navbar = ({ search, setSearch }) => {
  const { token, user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) setDropdownOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  console.log("formData----->",formData)

 

  const avatar = user?.image ? (
    <img
      src={user.image}
      alt="avatar"
      className="w-9 h-9 rounded-full border border-gray-200 object-cover"
    />
  ) : (
    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-lg">
      {user?.name?.[0]?.toUpperCase() || "U"}
    </div>
  );

  return (
    <>
      <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 px-4 md:px-8 py-3 flex justify-between items-center fixed top-0 w-full z-50 shadow-sm">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold text-gray-900 hover:text-black transition"
        >
          Dev Connect
        </Link>

        {/* Search Bar */}
        <div className="flex-1 hidden md:flex justify-center px-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-96 max-w-md px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-500 transition"
          />
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-6">
          {!token ? (
            <>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-700 font-medium border border-gray-200 transition"
                onClick={() => setDropdownOpen((o) => !o)}
              >
                {avatar}
                <span>{user?.name || user?.email}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30">
                  <button
                    onClick={() => {
                      setShowProfileModal(true);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-gray-800 font-medium rounded-t-xl"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 hover:bg-gray-100 text-red-600 font-medium rounded-b-xl"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Profile Modal */}

      {showProfileModal && (
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={user}
        />
      )}
    </>
  );
};

export default Navbar;
