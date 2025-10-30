import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import {Navbar} from "../Components/Navbar";
import {Footer} from "../Components/Footer";
import AuthLayout from "../Auth/AuthLayout";
import AuthCard from "../Auth/AuthCard";
import AuthHeader from "../Auth/Authheader";
import AuthInput from "../Auth/AuthInput";
import AuthButton from "../Auth/AuthButton";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom"; 

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Login Submitted:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Signed in successfully!");
    }, 1500);
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

          {/* Footer Link */}
          <p className="text-center text-sm text-textPrimary/70 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/login"
              className="text-cognify-teal font-semibold hover:text-cognify-dark transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </AuthCard>
      </AuthLayout>

      <Footer />
    </div>
  );
};

export default Signin;
