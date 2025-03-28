"use client";

import Link from "next/link";
import React from "react";

const LogIn = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
     <div className="absolute rounded-lg mt-10 right-10">
              <Link href="/">
                <button className="bg-[#FFC840] text-black py-3 px-10 rounded-lg text-sm font-bold shadow-none hover:shadow-inner transition-shadow duration-300">
                  Back
                </button>
              </Link>
            </div>

      {/* Main Container */}
      <div className="flex-grow w-full max-w-[1200px] flex items-center justify-between mx-auto">
        {/* Logo Positioned Further from the Form Container */}
        <div className="flex justify-start w-250 pr-16">
          <img src="/images/lumina.png" alt="Lumina Logo" />
        </div>

        {/* Form Container Positioned More to the Right */}
        <div className="w-2/3 flex flex-col items-center pl-16">
          <h2 className="text-2xl font-bold text-black text-center mb-3 font-montserrat">
            Log-in to your Account
          </h2>
          <div className="bg-[#919191] p-8 py-10 rounded-lg shadow-md w-full max-w-[550px]">
            <p className="text-white text-left text-lg font-montserrat">
              Welcome back to Lumina Insurance
            </p>
            <p className="text-white text-left text-lg mb-6 font-montserrat">
              — where your coverage stays Light and Easy.
            </p>
            <form className="flex flex-col font-montserrat">
              <input
                type="text"
                placeholder="Username"
                className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-2"
              />

              {/* Checkbox + Forgot Password Section */}
              <div className="flex items-center justify-between text-white text-sm mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <div>
                  Forgot Password?{" "}
                  <a href="#" className="text-yellow-300 font-bold">
                    Reset here
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="mt-15 w-full bg-[#FFC840] text-black font-bold py-2 rounded-lg shadow-md"
              >
                Log-In
              </button>
              <p className="text-center text-sm text-white mt-2">
                Don't have an account yet?{" "}
                <a href="/signUp" className="text-yellow-300">
                  Sign up here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFC840] text-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col items-start">
            <div className="flex space-x-2">
              <p className="font-montserrat text-xs">
                Copyright © 2025 Lumina Insurances. All rights reserved.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-2">
              <img src="/images/Facebook.png" alt="Facebook" className="h-4 w-4" />
              <img src="/images/LinkedIn.png" alt="LinkedIn" className="h-4 w-4" />
              <img src="/images/Instagram.png" alt="Instagram" className="h-4 w-4" />
              <img src="/images/X.png" alt="X" className="h-4 w-4" />
            </div>
          <div className="flex flex-col items-end">
            <div className="flex justify-center items-center space-x-2 mt-1">
              <a href="#" className="font-montserrat text-xs">Our Team</a>
              <a href="#" className="font-montserrat text-xs">Contact Us</a>
              <a href="#" className="font-montserrat text-xs">Terms and Conditions</a>
            </div>
            <div className="flex items-center mt-1">
              <img src="/images/mail.png" alt="Email" className="h-3 w-3 mr-1" />
              <p className="font-montserrat text-xs">lumina.insurances@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LogIn;