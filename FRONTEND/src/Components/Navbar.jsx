import { Link, useLocation } from "react-router-dom";
import { Home, Bell, Smile, Users, LogIn } from "lucide-react";
import logo from "../assets/LOGO.png"; 

export function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Home", path: "/", icon: <Home size={18} /> },
    { label: "Reminders", path: "/reminders", icon: <Bell size={18} /> },
    { label: "Mood", path: "/mood", icon: <Smile size={18} /> },
    { label: "Family", path: "/family", icon: <Users size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-teal-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src={logo}
            alt="Cognify Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-2xl font-semibold text-teal-600 tracking-tight hidden sm:block">
            Cognify
          </span>
        </Link>

        {/* naav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-2 py-1 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? "text-teal-600 bg-teal-50 font-semibold"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* login pc */}
        <Link
          to="/login"
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
        >
          <LogIn size={18} />
          Login
        </Link>

        {/* login phone */}
        <button className="md:hidden p-2 rounded-lg hover:bg-teal-50 transition-colors">
          <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
        </button>
      </div>
    </nav>
  );
}
