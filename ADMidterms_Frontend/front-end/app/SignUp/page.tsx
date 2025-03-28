"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    phonenumber: "",
    email: "",
    streetAddress: "",
    province: "",
    city: "",
    zipcode: "",
    country: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "Client", // Default role for new users
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          age: formData.age,
          nationality: formData.nationality,
          phonenumber: formData.phonenumber,
          email: formData.email,
          address: formData.streetAddress,
          province: formData.province,
          city: formData.city,
          zipcode: formData.zipcode,
          country: formData.country,
          username: formData.username,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setSuccessMessage("Registration successful! Please log in.");
      // Clear form after successful registration
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        age: "",
        nationality: "",
        phonenumber: "",
        email: "",
        streetAddress: "",
        province: "",
        city: "",
        zipcode: "",
        country: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "Client",
      });
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/logIn");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.message || 
        "An error occurred during registration. Please try again."
      );
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
          <Link href="/">
            <button className="bg-[#FFC840] px-4 py-2 text-black font-bold rounded-lg shadow-md font-montserrat">
              Back
            </button>
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

        {/* Form Container */}
        <div className="bg-gray-500 p-10 rounded-lg shadow-md w-[95%] mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 font-montserrat" id="registrationForm">
            {/* Personal Information */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">Personal Information</h3>
              <div className="grid gap-2">
                <div className="flex space-x-3 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 w-40 text-black"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 w-30 text-black"
                  />
                </div>
                <div className="flex space-x-2 items-center mb-4">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 w-40 text-black"
                  />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="input bg-white border border-gray-300 rounded-lg px-3 py-2 w-40 text-black"
                  />
                </div>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Nationality"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">Address</h3>
              <div className="grid gap-2">
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Province"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
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
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
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
            </div>
          </form>

          {/* Error and Success Messages */}
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            form="registrationForm"
            className="mt-6 w-full bg-[#FFC840] text-black font-bold py-2 rounded-lg shadow-md hover:bg-[#FFD460] transition-colors"
          >
            Register
          </button>

          <p className="text-center text-sm text-white mt-2">
            Already have an account?{" "}
            <Link href="/logIn" className="text-yellow-300">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;