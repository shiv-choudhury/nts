import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../apis/ApiCalls";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!form.email) newErrors.email = "Please fill this field";
    if (!form.password) newErrors.password = "Please fill this field";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(form);
      const { data, status, message } = response.data;
      if (status) {
        localStorage.setItem("token", data?.token);
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 flex justify-center items-start bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">
              Username or Email Address*
            </label>
            <input
              type="text"
              name="email"
              className={`border p-2 w-full rounded ${
                errors.email ? "border-red-500" : "border-green-500"
              }`}
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Password *</label>
            <input
              type="password"
              name="password"
              className={`border p-2 w-full rounded ${
                errors.password ? "border-red-500" : "border-green-500"
              }`}
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 text-sm">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded-lg"
          >
            {loading ? "Please wait..." : "SIGN IN"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
