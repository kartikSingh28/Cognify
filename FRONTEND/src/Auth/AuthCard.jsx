import React from "react";

const AuthCard = ({ children, className = "" }) => (
  <div
    className={`bg-white shadow-3xl rounded-3xl p-8 sm:p-10 max-w-lg w-full border border-cognify-mint/50 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

export default AuthCard;
