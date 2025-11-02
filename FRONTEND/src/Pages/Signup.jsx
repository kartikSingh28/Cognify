import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Navbar } from "../Components/Navbar";
import AuthLayout from "../Auth/AuthLayout";
import AuthCard from "../Auth/AuthCard";
import AuthHeader from "../Auth/AuthHeader";
import AuthInput from "../Auth/AuthInput";
import AuthButton from "../Auth/AuthButton";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // ✅ feedback message

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // ✅ Send request to your Express backend
      const response = await fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Account created successfully!");
        console.log("Signup success:", data);
        setFormData({ fullName: "", email: "", password: "" });
      } else {
        setMessage(`❌ ${data.message || "Signup failed"}`);
        console.error("Signup error:", data);
      }
    } catch (err) {
      console.error("Network error:", err);
      setMessage("❌ Unable to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen antialiased">
      <Navbar />

      <AuthLayout>
        <AuthCard className="mx-auto my-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Cognify Logo" className="w-20 h-20 rounded-xl" />
          </div>

          {/* Header */}
          <AuthHeader
            title="Create Your Account"
            subtitle="Start your journey with Cognify today and unlock your learning potential."
          />

          {/* Form */}
          <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
            <AuthInput
              label="Full Name"
              name="fullName"
              placeholder="John Doe"
              icon={User}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <AuthInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <AuthInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              minLength="8"
              required
            />
            <AuthButton
              text={isSubmitting ? "Creating Account..." : "Sign Up"}
              type="submit"
              disabled={isSubmitting}
            />
          </form>

          {/* ✅ Message Display */}
          {message && (
            <p className="text-center text-sm mt-4 text-gray-600">{message}</p>
          )}

          <p className="text-center text-sm text-textPrimary/70 mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-cognify-teal font-semibold hover:text-cognify-dark transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </AuthCard>
      </AuthLayout>
    </div>
  );
};

export default Signup;
