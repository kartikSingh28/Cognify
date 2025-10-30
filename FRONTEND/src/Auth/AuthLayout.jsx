import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-bgLight via-white to-cognify-mint/20 px-6 overflow-hidden font-sans">
      {/* Background Blur Shape */}
      <div className="absolute top-1/2 left-1/2 w-[80%] h-[60%] -translate-x-1/2 -translate-y-1/2 bg-cognify-teal/20 blur-3xl rounded-full pointer-events-none opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
