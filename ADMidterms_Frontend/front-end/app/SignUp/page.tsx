"use client";

import React from "react";

const Signup = () => {
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
          <a
            href="/"
            className="bg-[#FFC840] px-4 py-2 text-black font-bold rounded-lg shadow-md font-montserrat"
          >
            Back
          </a>
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
          <form className="grid grid-cols-3 gap-6 font-montserrat">
            {/* Personal Information */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">Personal Information</h3>
              <div className="grid gap-2">
                <div className="flex space-x-3 mb-4">
                  <input type="text" placeholder="First Name" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 w-40 text-black" />
                  <input type="text" placeholder="Last Name" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 flex-1 w-30 text-black" style={{ marginRight: '10px' }} />
                </div>
                <div className="flex space-x-2 items-center mb-4"> {/* Fixes Age Alignment */}
                  <input type="date" placeholder="Date of Birth" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 w-40 text-black" />
                  <input type="number" placeholder="Age" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 w-40 text-black" style={{ marginRight: '10px' }} />
                </div>
                <input type="text" placeholder="Nationality" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" />
                <input type="text" placeholder="Phone Number" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" />
                <input type="email" placeholder="Email Address" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" />
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">Address</h3>
              <div className="grid gap-2">
                <input type="text" placeholder="Street Address" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" style={{ marginRight: '10px' }} />
                <input type="text" placeholder="State/Province" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" style={{ marginRight: '10px' }} />
                <input type="text" placeholder="City" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" style={{ marginRight: '10px' }} />
                <input type="text" placeholder="Zip/Postal Code" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" style={{ marginRight: '10px' }} />
                <input type="text" placeholder="Country" className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4" style={{ marginRight: '10px' }} />
              </div>
            </div>

            {/* Account Details */}
            <div>
              <h3 className="text-white font-semibold mb-2 italic">
                Account Details
              </h3>
              <div className="grid gap-2">
                <input
                  type="text"
                  placeholder="Username"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input bg-white border border-gray-300 rounded-lg px-3 py-2 text-black mb-4"
                />
                <input
                  type="password"
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

              <button
                type="submit"
                className="mt-4 w-full bg-[#FFC840] text-black font-bold py-2 rounded-lg shadow-md"
              >
                Create Account
              </button>

              <p className="text-center text-sm text-white mt-2">
                Already have an account?{" "}
                <a href="/logIn" className="text-yellow-300">
                  Log in here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default Signup;