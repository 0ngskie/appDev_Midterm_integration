"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    age: "",
    nationality: "",
    contact_number: "",
    email: "",
    address: "",
    province: "",
    city: "",
    zipcode: "",
    country: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "Client",
    agent_id: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Ensure we never set undefined values
    const newValue = value === undefined ? "" : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    // Clear messages when user starts typing
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Remove confirmPassword from the data sent to the backend
      const { confirmPassword, ...submitData } = formData;
      
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create account");
      }

      const data = await response.json();
      setSuccess("Account created successfully! Redirecting to login page...");
      setTimeout(() => {
        router.push("/logIn");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating your account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
      {/* Main Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-[90%] w-full flex flex-col">

        {/* Back to Home Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/"
            className="bg-[#FFC840] px-4 py-2 text-black font-bold rounded-lg shadow-md font-montserrat"
          >
            Back
          </Link>
        </div>

        {/* Centered Logo */}
        <div className="flex justify-center mb-4 mt-[-20px]">
          <img src="/images/lumina.png" alt="Lumina Logo" className="h-53" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black text-center mb-3 font-montserrat">
          Register an Account
        </h2>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-gray-500 p-10 rounded-lg shadow-md w-[95%] mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 font-montserrat">
            {/* Personal Information */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">Personal Information</h3>
              <div className="grid gap-2">
                <div className="flex space-x-3 mb-4">
                  <input 
                    type="text" 
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name" 
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 w-40 text-black" 
                    required
                  />
                  <input 
                    type="text" 
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name" 
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 w-30 text-black" 
                    style={{ marginRight: '10px' }}
                    required
                  />
                </div>
                <div className="flex space-x-2 items-center mb-4">
                  <input 
                    type="date" 
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    placeholder="Date of Birth" 
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 w-40 text-black" 
                    required
                  />
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age" 
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 w-40 text-black" 
                    style={{ marginRight: '10px' }}
                    required
                  />
                </div>
                <input 
                  type="text" 
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Nationality" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
                <input 
                  type="text" 
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="Phone Number" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">Address</h3>
              <div className="grid gap-2">
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
                <input 
                  type="text" 
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="State/Province" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
                <input 
                  type="text" 
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="Zip/Postal Code" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country" 
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" 
                  required
                />
              </div>
            </div>

            {/* Account Details */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">Account Details</h3>
              <div className="grid gap-2">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                  required
                />
              </div>

              <div className="flex items-center mt-2">
                <input type="checkbox" id="subscribe" className="mr-2" />
                <label htmlFor="subscribe" className="text-sm text-white">
                  I agree to receive updates and offers from Lumina Insurances
                </label>
              </div>

              <div className="flex items-center mt-2">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-sm text-white">
                  I accept the{" "}
                  <a href="#" className="text-yellow-300">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-yellow-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-[#FFC840] text-black font-bold py-2 rounded-lg shadow-md disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-white mt-2">
                Already have an account?{" "}
                <Link href="/logIn" className="text-yellow-300">
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default Signup;