import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/AuthSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (data) => {
    const err = {};
    if (!data.email.trim()) err.email = "Email is required";
    else if (!data.email.includes("@")) err.email = "Invalid email";
    if (!data.password) err.password = "Password is required";
    else if (data.password.length < 4) err.password = "Password too short";
    return err;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitted)
      setErrors(validate({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const err = validate(formData);
    if (Object.keys(err).length > 0) return setErrors(err);

    dispatch(loginUser(formData)).then((res) => {
          // console.log("res-------> login res",res)
      if (res?.payload?.message === "Login successful") {
        alert(res?.payload?.message);
        navigate("/");
      } else {
        alert(res?.payload?.message || res?.payload);
      }
    });
  };
  // console.log("errror", error);

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <FaSignInAlt className="text-green-600" /> Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative mb-2 py-2 ">
          {/* Email Icon */}
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

          {/* Input */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none ${
              errors.email ? "border-red-400" : ""
            }`}
          />

          {/* Error (separate layer, no icon movement) */}
          {errors.email && (
            <p className="absolute text-red-500 text-sm left-1 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-2  py-4">
          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none ${
              errors.password ? "border-red-400" : ""
            }`}
          />
          {errors.password && (
            <p className="absolute text-red-500 text-sm left-1 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            "Logging in..."
          ) : (
            <>
              <FaSignInAlt /> Login
            </>
          )}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
