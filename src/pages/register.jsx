import React, {useState} from "react";
import axios from "axios";
import "../styles/global.css"


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                { email, password }
            );
            setSuccess(response.data.message);
            setError("");
        }   catch (err) {
            setSuccess("");
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleRegister} className="p-6 shadow-md rounded-md bg-white">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="border p-2 rounded w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="border p-2 rounded w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-500 text-white p-2 rounded w-full">Register</button>

                <p className="text-sm mt-4">
                    Already have an account? <a href="/" className="text-blue-500">Login here</a>
                </p>
            </form>
        </div>
    );

};

export default Register;