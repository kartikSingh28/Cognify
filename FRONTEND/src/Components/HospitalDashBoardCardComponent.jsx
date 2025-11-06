import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function HospitalDashBoardCardComponent() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const raw = localStorage.getItem("user");
            if (raw) {
                const user = JSON.parse(raw);
                if (user && user.fullName) {
                    // Prefer first name for a friendlier greeting
                    const firstName = user.fullName.split(" ")[0];
                    setName(firstName);
                    return;
                }
            }

            // Fallback: if there's no stored user, try to use token presence
            const token = localStorage.getItem("token");
            if (token) {
                setName("friend");
            }
        } catch (err) {
            console.error("Error reading user from localStorage:", err);
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 border">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl">
                    {name ? name[0].toUpperCase() : "C"}
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{name ? `Welcome back, ${name}!` : "Welcome to Cognify"}</h2>
                    <p className="text-sm text-gray-500 mt-1">We're glad to see you. Explore your dashboard to continue.</p>
                </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md font-medium hover:opacity-95"
                >
                    Open Dashboard
                </button>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}