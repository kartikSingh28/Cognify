import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Navbar } from "../Components/Navbar";
import AuthLayout from "../Auth/AuthLayout";
import AuthCard from "../Auth/AuthCard";
import AuthHeader from "../Auth/AuthHeader";
import AuthInput from "../Auth/AuthInput";
import AuthButton from "../Auth/AuthButton";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"; 

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ for redirect after login

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save JWT token in localStorage
        localStorage.setItem("token", data.token);
        setMessage("✅ Login successful!");
        console.log("User logged in:", data);

        // ✅ Optional redirect after login
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(`❌ ${data.message || "Login failed"}`);
        console.error("Login error:", data);
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
            title="Welcome Back"
            subtitle="Sign in to your Cognify account and continue your learning journey."
          />

          {/* Form */}
          <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
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
              required
            />

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-cognify-teal hover:text-cognify-dark transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            <AuthButton
              text={isSubmitting ? "Signing In..." : "Sign In"}
              type="submit"
              disabled={isSubmitting}
            />
          </form>

          {/* ✅ Feedback Message */}
          {message && (
            <p className="text-center text-sm mt-4 text-gray-600">{message}</p>
          )}

          {/* Footer Link */}
          <p className="text-center text-sm text-textPrimary/70 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-cognify-teal font-semibold hover:text-cognify-dark transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </AuthCard>
      </AuthLayout>
    </div>
  );
};

export default Signin;
