import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../apis/ApiCalls";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobileno: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = "Please fill this field";
    if (!form.password) newErrors.password = "Please fill this field";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please fill this field";

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.agree) {
      toast.error("You must agree to the privacy policy");
      newErrors.agree = "Required";
    }

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
      handleSignup();
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        mobileno: form.mobileno,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        agree: form.agree
      };
      const response = await register(payload);
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
    <div className="py-8 flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              className="border p-2 w-full rounded"
              value={form.firstname}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="border p-2 w-full rounded"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block font-medium">Mobile Number</label>
            <input
              type="number"
              name="mobileno"
              className="border p-2 w-full rounded"
              value={form.mobileno}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`border p-2 w-full rounded ${
                errors.email ? "border-red-500" : ""
              }`}
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`border p-2 w-full rounded pr-16 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-2 text-sm cursor-pointer text-blue-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className={`border p-2 w-full rounded pr-16 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-2 text-sm cursor-pointer text-blue-600"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Privacy Policy Agreement */}
          <div>
            <label className="text-sm font-light text-gray-800">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <Link className="text-blue-600" to="/pages/privacy-policy">
                privacy policy
              </Link>
              .
            </label>
            <label className="mt-1 flex items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              I agree to the{" "}
              <Link className="text-blue-600" to="/pages/privacy-policy">
                privacy policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
          >
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Sign In Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
