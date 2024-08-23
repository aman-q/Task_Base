import React, { useState, useEffect } from 'react';
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

    const [theme, setTheme] = useState('dark');
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        setIsLight(savedTheme === 'light');
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = isLight ? 'dark' : 'light';
        setTheme(newTheme);
        setIsLight(!isLight);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/upload');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className={`flex flex-col md:flex-row h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-4`}>

            {/* Left Section */}
            <div className={`hidden md:flex ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-300'} flex-col items-center justify-between md:p-12 w-full md:w-1/2 rounded-3xl m-2`}>
                <div className={`${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-400'} flex flex-col p-8 md:p-12 w-full h-full rounded-3xl`}>
                    <div className="flex flex-col w-full">
                        <div className={`flex items-center p-2 rounded-full w-max mb-6 ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}`}>
                            <img src={logo} alt="Logo" className="w-6 h-6 mr-2" />
                            <span className={`${theme === 'dark' ? 'text-black' : 'text-white'} font-bold`}>Base</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-start mb-6">
                            Generate detailed reports with just one click
                        </h1>
                    </div>
                    <div className="flex items-center">
                        <div className="mt-80"> {/* Adjust margin as needed */}
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isLight}
                                    onChange={toggleTheme}
                                />
                                <div className={`w-11 h-6 ${isLight ? 'bg-blue-600' : 'bg-gray-200'} rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600`}></div>
                                <div className={`absolute left-1 top-1 w-4 h-4 ${isLight ? 'bg-white' : 'bg-gray-400'} rounded-full transition-transform transform peer-checked:translate-x-5`}></div>
                            </label>
                        </div>
                        <img src={image} alt="Person with camera" className="h-80 ml-[17.5rem] mt-12" />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center items-center p-6 md:p-12 w-full md:w-1/2">
                <div className="max-w-sm w-full">
                    <h2 className="text-3xl font-bold">Sign In</h2>
                    <p className="mt-2 mb-6">Sign in to your account</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => login({ method: 'google' })}
                            className={`flex items-center justify-center w-full font-extralight p-3 rounded-full mb-4 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-200 text-black'}`}>
                            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </button>
                        <button
                            onClick={() => login({ method: 'apple' })}
                            className={`flex items-center justify-center w-full font-extralight p-3 rounded-full mb-4 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-200 text-black'}`}>
                            <img src={apple} alt="Apple" className="w-5 h-5 mr-2" />
                            Sign in with Apple
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="font-bold">Email address</label>
                        <input type="email" className={`w-full p-3 rounded mt-1 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} placeholder="johndoe@gmail.com" />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold">Password</label>
                        <input type="password" className={`w-full p-3 rounded mt-1 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} placeholder="••••••••" />
                    </div>
                    <div className="flex justify-between mb-4">
                        <Link to="#" className="text-blue-500">Forgot password?</Link>
                    </div>
                    <button
                        onClick={() => login({ email: 'aman14jsr@gamil.com', password: '12456' })}
                        className={`w-full p-3 rounded ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                        Sign In
                    </button>
                    <p className="mt-6">Don't have an account?
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
