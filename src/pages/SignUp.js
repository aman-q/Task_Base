import React from 'react';
import image from '../asset/image.svg';
import logo from '../asset/logo.svg';
import github from '../asset/github.svg';
import twitter from '../asset/twitter.svg';
import linkedin from '../asset/linkedLn.svg';
import discord from '../asset/discore.svg';
import google from '../asset/google.svg';
import apple from '../asset/apple.svg';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const { login, register, isAuthenticated } = useKindeAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate('/upload');
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-900 p-4">
            {/* Left Section (hidden on small devices) */}
            <div className="hidden md:flex bg-blue-600 flex-col items-center justify-between md:p-12 w-full md:w-1/2 rounded-3xl m-2">
                <div className="bg-blue-700 flex flex-col p-8 md:p-12 w-full h-full rounded-3xl">
                    <div className="flex flex-col w-full">
                        {/* Logo positioned at the top */}
                        <div className="bg-white flex items-center p-2 rounded-full w-max mb-6">
                            <img src={logo} alt="Logo" className="w-6 h-6 mr-2" />
                            <span className="font-bold text-black">Base</span>
                        </div>

                        {/* Text below the logo */}
                        <h1 className="text-white text-3xl md:text-4xl font-bold text-start mb-6">
                            Generate detailed reports with just one click
                        </h1>
                    </div>

                    {/* Image and buttons at the bottom */}
                    <div className="grid align-baseline">
                        <img src={image} alt="Person with camera" className="h-48 align-baseline" />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center items-center p-6 md:p-12 w-full md:w-1/2">
                <div className="max-w-sm w-full ">
                    <h2 className="text-white text-3xl font-bold">Sign In</h2>
                    <p className="text-gray-400 mt-2 mb-6">Sign in to your account</p>
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => login({ method: 'google' })}
                            className="flex items-center justify-center w-full font-extralight bg-slate-950 text-white p-3 rounded-full mb-4">
                            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </button>
                        <button 
                            onClick={() => login({ method: 'apple' })}
                            className="flex items-center justify-center w-full font-extralight bg-slate-950 text-white p-3 rounded-full mb-4">
                            <img src={apple} alt="Apple" className="w-5 h-5 mr-2" />
                            Sign in with Apple
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400 font-bold">Email address</label>
                        <input type="email" className="w-full bg-gray-700 text-white p-3 rounded mt-1" placeholder="johndoe@gmail.com" />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400 font-bold">Password</label>
                        <input type="password" className="w-full bg-gray-700 text-white p-3 rounded mt-1" placeholder="••••••••" />
                    </div>
                    <div className="flex justify-between mb-4">
                        <Link to="#" className="text-blue-500">Forgot password?</Link>
                    </div>
                    <button 
                        onClick={() => login({ email: 'aman14jsr@gamil.com', password: '12456' })}
                        className="w-full bg-blue-600 text-white p-3 rounded">
                        Sign In
                    </button>
                    <p className="text-gray-500 mt-6">Don't have an account? 
                        <button 
                            onClick={register} 
                            className="text-blue-500 ml-1">Register here</button>
                    </p>
                </div>
                <div className="flex justify-center mt-12 space-x-4">
                    <Link to="/"><img src={github} alt="GitHub" className="w-6 h-6" /></Link>
                    <Link to="/"><img src={twitter} alt="Twitter" className="w-6 h-6" /></Link>
                    <Link to="/"><img src={linkedin} alt="LinkedIn" className="w-6 h-6" /></Link>
                    <Link to="/"><img src={discord} alt="Discord" className="w-6 h-6" /></Link>
                </div>
            </div>
        </div>
    );
}
