import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agree: false
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.firstName) newErrors.firstName = "Please fill this field";
    if (!form.lastName) newErrors.lastName = "Please fill this field";
    if (!form.email) newErrors.email = "Please fill this field";
    if (!form.mobile) newErrors.mobile = "Please fill this field";
    if (!form.password) newErrors.password = "Please fill this field";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please fill this field";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.agree) newErrors.agree = "You must agree to the privacy policy";

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
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(form).map(
            ([key, value]) =>
              key !== "agree" && (
                <div key={key}>
                  <label className="block font-medium capitalize">
                    {key
                      .replace("confirmPassword", "Confirm Password")
                      .replace("mobile", "Mobile Number")
                      .replace("email", "Email Id")}{" "}
                    *
                  </label>
                  <input
                    type={
                      key.includes("password") ||
                      key.includes("confirmPassword")
                        ? "password"
                        : key.includes("mobile")
                        ? "number"
                        : "text"
                    }
                    name={key}
                    className={`border p-2 w-full rounded ${
                      errors[key] ? "border-red-500" : "border-green-500"
                    }`}
                    value={value}
                    onChange={handleChange}
                  />
                  {errors[key] && (
                    <p className="text-red-500 text-sm">{errors[key]}</p>
                  )}
                </div>
              )
          )}
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
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded-lg"
          >
            SIGN UP
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
