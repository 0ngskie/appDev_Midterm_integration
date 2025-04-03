"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function ReviewPolicyClaims() {
  const router = useRouter(); // Initialize the router

  const policyData = [
    { type: "Retirement (Premium)", date: "February 2, 2025" },
    { type: "Education (Basic)", date: "February 2, 2025" },
    { type: "Health (Premium)", date: "February 2, 2025" },
    { type: "Auto (Standard)", date: "February 2, 2025" },
    { type: "Auto (Premium)", date: "February 2, 2025" },
    { type: "Retirement (Premium)", date: "February 2, 2025" },
    { type: "Education (Basic)", date: "February 2, 2025" },
    { type: "Health (Premium)", date: "February 2, 2025" },
    { type: "Auto (Standard)", date: "February 2, 2025" },
    { type: "Auto (Premium)", date: "February 2, 2025" },
  ];

  return (
    <div className="text-black mt-30 min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            {/* Redirect to writerHomepage when the Lumina logo is clicked */}
            <img
              src="/images/lumina.png"
              alt="Lumina Logo"
              width="80"
              height="80"
              className="cursor-pointer"
              onClick={() => router.push('/writerHomepage')}
            />
          </div>
          <div className="flex space-x-2">
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">About Lumina</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Policies</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Claim and Services</button>
            <button
              className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold"
              onClick={() => router.push('/writerReviewPolicy')} // Redirect to writerReviewPolicy
            >
              Review Policy Requests
            </button>
            <button
              className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold"
              onClick={() => router.push('/writerReviewClaims')} // Redirect to writerReviewClaims
            >
              Review Claims
            </button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
              <span
                onClick={() => router.push('/writerProfile')} // Redirect to writerProfile
              >
                MY PROFILE
              </span>
              <button
                className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1"
                onClick={() => router.push('/logIn')} // Redirect to logIn
              >
                <span>Logout</span>
              </button>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6">Review Policy Claims</h1>

        <div className="border-2 border-[#FFC840] rounded-lg p-6 max-w-2xl mx-auto mb-6 bg-white">
          {policyData.map((policy, index) => (
            <div key={index} className="flex items-center mb-4">
              <button
                className="bg-[#FFC840] px-4 py-2 rounded-full text-black font-medium min-w-[100px] text-center mr-4"
                onClick={() => router.push("/writerReviewClaim")}
              >
                Review
              </button>
          <div>
            <span className="font-medium">{policy.type}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">Date: {policy.date}</span>
          </div>
        </div>
      ))}
    </div>

        <div className="flex justify-center">
          <button className="bg-[#FFC840] px-6 py-2 rounded-full text-black font-medium">View More</button>
        </div>
      </main>

      <footer className="bg-[#FFC840] text-black py-4 mt-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col items-start">
            <div className="flex space-x-2">
              <p className="font-montserrat text-xs">Copyright © 2025 Lumina Insurances. All rights reserved.</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex justify-center items-center space-x-2 mt-1">
              <a href="#" className="font-montserrat text-xs">Our Team</a>
              <a href="#" className="font-montserrat text-xs">Contact Us</a>
              <a href="#" className="font-montserrat text-xs">Terms and Conditions</a>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-2 mt-2">
              <img src="/images/Facebook.png" alt="Facebook" className="h-4 w-4" />
              <img src="/images/LinkedIn.png" alt="LinkedIn" className="h-4 w-4" />
              <img src="/images/Instagram.png" alt="Instagram" className="h-4 w-4" />
              <img src="/images/X.png" alt="X" className="h-4 w-4" />
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
}