import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/AuthSlice/authSlice";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const SignupForm = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (data) => {
    const err = {};
    if (!data.name.trim()) err.name = "Name is required";
    if (!data.email.trim()) err.email = "Email is required";
    else if (!data.email.includes("@")) err.email = "Invalid email";
    if (!data.password) err.password = "Password is required";
    else if (data.password.length < 4) err.password = "Password too short";
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if (submitted) setErrors(validate(updatedData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    dispatch(signupUser(formData)).then((res) => {
      if (res?.payload?.message === "Signup successful") {
        setIsLogin(true);
        alert(res?.payload?.message);
      } else {
        alert(res?.payload?.message || res?.payload);
      }
    });
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <FaUserPlus className="text-blue-600" /> Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="relative py-2 mb-2">
          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
              errors.name ? "border-red-400" : ""
            }`}
          />
          <div className="absolute left-0 top-full ">
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="relative py-2 mb-2">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
              errors.email ? "border-red-400" : ""
            }`}
          />
          <div className="absolute left-0 top-full ">
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="relative py-2 mb-2">
          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
              errors.password ? "border-red-400" : ""
            }`}
          />
          <div className="absolute left-0 top-full ">
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            "Signing up..."
          ) : (
            <>
              <FaUserPlus /> Sign Up
            </>
          )}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
