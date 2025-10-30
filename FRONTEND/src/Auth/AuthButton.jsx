import React from "react";

const AuthButton = ({ text, className = "", ...props }) => (
  <button
    className={`w-full bg-gradient-to-r from-cognify-teal to-cognify-teal/90 text-white py-3 rounded-xl font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-cognify-teal/50 mt-2 ${className}`}
    {...props}
  >
    {text}
  </button>
);

export default AuthButton;
