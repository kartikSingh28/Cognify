import React from "react";

const AuthInput = ({ label, type = "text", placeholder, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-1">
    {label && (
      <label className="text-sm font-medium text-textPrimary flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-cognify-teal" />}
        {label}
      </label>
    )}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 border border-cognify-mint/40 rounded-xl bg-bgLight text-textPrimary placeholder:text-textPrimary/50 focus:outline-none focus:ring-2 focus:ring-cognify-teal focus:border-cognify-teal/60 transition-all duration-200 shadow-sm"
      {...props}
    />
  </div>
);

export default AuthInput;
