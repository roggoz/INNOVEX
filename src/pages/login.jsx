import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/global.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                { email, password }
            );
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/products"); // Redirect to the ProductsCatalogue page
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="p-6 shadow-md rounded-md bg-white">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="text"
                        className="border p-2 rounded w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password:</label>
                    <input
                        type="password"
                        className="border p-2 rounded w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-500 text-white p-2 rounded w-full">Login</button>

                <p className="text-sm mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500">Register here</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
