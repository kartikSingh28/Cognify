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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form Submitted:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Account created successfully!");
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
