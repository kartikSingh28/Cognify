import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); // redirect after signup+login

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    // capture credentials because we'll attempt to auto-login after signup
    const credentials = { email: formData.email, password: formData.password };
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
        setMessage("✅ Account created successfully! Attempting to sign you in...");
        console.log("Signup success:", data);

        // Auto-signin using the same credentials
        try {
          const signInResp = await fetch("http://localhost:3000/api/v1/user/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const signInData = await signInResp.json();
          if (signInResp.ok) {
            // persist token and user for greeting
            localStorage.setItem("token", signInData.token);
            if (signInData.user) localStorage.setItem("user", JSON.stringify(signInData.user));
            setMessage("✅ Signed in — redirecting to your dashboard...");
            // small delay so user sees the message
            setTimeout(() => navigate("/dashboard"), 700);
            // clear form
            setFormData({ fullName: "", email: "", password: "" });
          } else {
            setMessage(`✅ Account created — but auto-login failed: ${signInData.message || "Please sign in manually."}`);
            console.error("Auto-signin failed:", signInData);
          }
        } catch (err) {
          console.error("Auto-signin network error:", err);
          setMessage("✅ Account created — but auto-login failed due to network error. Please sign in manually.");
        }
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
