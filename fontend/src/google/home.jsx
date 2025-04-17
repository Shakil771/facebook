import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { GrMicrophone } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineVideocam, MdOutlineVolumeUp } from "react-icons/md";

const Home = () => {
    const [micPermission, setMicPermission] = useState(false);
    const [camPermission, setCamPermission] = useState(false);
    const [name, setName] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const requestPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            if (stream.getAudioTracks().length > 0) setMicPermission(true);
            if (stream.getVideoTracks().length > 0) setCamPermission(true);
        } catch (error) {
            console.warn("Permission denied or unavailable", error);
        }
    };

    useEffect(() => {
        // Check initial permission status
        navigator.permissions?.query({ name: "microphone" }).then(res => {
            setMicPermission(res.state === "granted");
        });
        navigator.permissions?.query({ name: "camera" }).then(res => {
            setCamPermission(res.state === "granted");
        });
    }, []);

    return (
        <div className="min-h-screen bg-white text-center lg:p-6 flex flex-col items-center space-y-8">
            {/* Header */}
            <div className="flex items-center m-1 justify-between w-full">
                <div className="flex items-center space-x-2 text-2xl font-semibold">
                    <img src="/google_meet_icon.svg" alt="My SVG Icon" width={48} height={48} />
                    <span>Google Meet</span>
                </div>
                <Link to='/signin/chrome/sync' className="text-blue-500 text-lg font-medium">Sign in</Link>
            </div>

            <div className="flex flex-col lg:flex-row w-full items-center justify-center">
                {/* Permission Card */}
                <div className="flex flex-col">
                    <div className="bg-gray-900 text-white my-5 md:m-20 lg:mb-6 p-6 rounded-2xl items-center justify-center flex flex-col max-w-[560px] lg:min-w-[660px] w-full shadow-lg">
                        <div className="w-full flex justify-end mb-6 sm:mb-16"><span ><CiMenuKebab className="size-6 md:size-8" /></span></div>
                        <p className="md:text-xl text-lg font-medium mb-4">Do you want people to see and hear you in the meeting?</p>
                        <button
                            onClick={requestPermissions}
                            className="bg-blue-600 text-sm  hover:bg-blue-700 transition text-white px-4 py-2 rounded font-medium"
                        >
                            Allow microphone and camera
                        </button>
                        <div className="flex justify-center space-x-6 mt-8 md:mt-16">
                            <div className="flex flex-col items-center">
                                <div className="bg-red-600 p-3 rounded-full">
                                    <FaMicrophoneSlash className="text-white sm:text-3xl" />
                                    {!micPermission && <IoWarning className="absolute -top-2 -right-2 text-yellow-400" />}
                                </div>
                                <span className="mt-2 text-sm">Microphone</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-red-600 p-3 rounded-full">
                                    <FaVideoSlash className="text-white sm:text-3xl" />
                                    {!camPermission && <IoWarning className="absolute -top-2 -right-2 text-yellow-400" />}
                                </div>
                                <span className="mt-2 text-sm">Camera</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:flex justify-start space-x-2 items-start ml-20 hidden ">
                        <div className="flex items-center bg-gray-200 justify-center border w-48 border-gray-400 py-1 text-lg rounded-full text-gray-400">
                            <GrMicrophone className="mr-2" /><span>Permission ne...</span><IoIosArrowDown className="mr-2" />
                        </div>
                        <div className="flex items-center bg-gray-200 justify-center border w-48 border-gray-400 py-1 text-lg rounded-full text-gray-400">
                            <MdOutlineVolumeUp className="mr-2" /><span>Permission ne...</span><IoIosArrowDown className="mr-2" />
                        </div>
                        <div className="flex items-center bg-gray-200 justify-center border w-48 border-gray-400 py-1 text-lg rounded-full text-gray-400">
                            <MdOutlineVideocam className="mr-2" /><span>Permission ne...</span><IoIosArrowDown className="mr-2" />
                        </div>
                    </div>
                </div>

                {/* Name input */}
                <div className="w-full lg:mt-36 flex justify-center items-center flex-col">

                    <Link to='/signin/chrome/sync?ssp=1&continue=https%3A%2F%2Fwww.google.com%2F' className=" border w-64 sm:w-72 border-gray-800 py-2 sm:py-3  bg-gray-300 text-xl text-gray-500 rounded-full">Ask to join</Link>
                    <br />
                    <Link to='/signin/chrome/sync?ssp=1&continue=https%3A%2F%2Fwww.google.com%2F' className="flex items-center justify-center border w-60 sm:w-64 border-gray-800 py-2 text-xl rounded-full text-gray-500"><span>Other ways to join</span><IoIosArrowDown className="mr-2" /></Link>


                </div>
            </div>


            {/* Footer */}
            <div className="text-sm text-gray-500 max-w-xl text-center">
                By joining, you agree to the <a className="text-blue-600 underline" href="#">Terms of Service</a> and <a className="text-blue-600 underline" href="#">Privacy Policy</a>. System info will be sent to confirm you're not a bot.
            </div>
        </div>
    );
}

export default Home