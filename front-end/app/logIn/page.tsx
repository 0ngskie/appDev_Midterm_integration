"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
  };

  const getRedirectPath = (role: string) => {
    switch (role.toLowerCase()) {
      case "client":
        return "/clientHomepage";
      case "agent":
        return "/agentHomepage";
      case "writer":
        return "/writerHomepage";
      default:
        return "/";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setSuccess("Login successful! Redirecting...");
      
      // Store user data if remember me is checked
      if (rememberMe) {
        localStorage.setItem("userData", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(data.user));
      }

      // Get the appropriate redirect path based on user role
      const redirectPath = getRedirectPath(data.user.role);
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);

    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

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

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col font-montserrat">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-2"
              />

              {/* Checkbox + Forgot Password Section */}
              <div className="flex items-center justify-between text-white text-sm mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <div>
                  Forgot Password?{" "}
                  <Link href="/reset-password" className="text-yellow-300 font-bold">
                    Reset here
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-15 w-full bg-[#FFC840] text-black font-bold py-2 rounded-lg shadow-md ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-inner transition-shadow duration-300"
                }`}
              >
                {loading ? "Logging in..." : "Log-In"}
              </button>
              <p className="text-center text-sm text-white mt-2">
                Don&apos;t have an account yet?{" "}
                <Link href="/SignUp" className="text-yellow-300">
                  Sign up here
                </Link>
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