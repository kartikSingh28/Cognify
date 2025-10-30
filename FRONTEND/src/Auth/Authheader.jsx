import React from "react";

const AuthHeader = ({ title, subtitle }) => (
  <div className="text-center">
    <h2 className="text-4xl font-extrabold text-cognify-dark tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-textPrimary/70 mt-2 text-base leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default AuthHeader;
