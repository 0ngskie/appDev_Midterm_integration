"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Page: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header from writerReviewClaims */}
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

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-[900px] h-[200px] bg-[#D9D9D9] rounded-3xl mb-1">
          <div className="absolute left-[1px] w-[200px] h-[200px] bg-[#FFFFFF] border-1 border-black rounded-3xl">
            <img src="/images/lumina.png" alt="Lumina Logo" className="absolute top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute left-[230px] top-[10px]">
            {/* Username */}
            <div className="text-[24px] font-semibold text-black font-montserrat">
              Hello! Ongskie
            </div>
            {/* Name */}
            <div className="text-[15px] font-normal text-black font-montserrat mt-2">
              Name: John Benedict Ong
            </div>
            {/* Birthdate */}
            <div className="text-[15px] font-normal text-black font-montserrat mt-2">
              Birthdate: November 1, 2345
            </div>
            {/* Age */}
            <div className="text-[15px] font-normal text-black font-montserrat mt-2">
              Age: 36
            </div>
            {/* Edit Profile */}
            <div className="mt-4 w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full">
              <span className="text-center">EDIT PROFILE</span>
            </div>
          </div>
          <div className="absolute right-[20px] top-[55px]">
            {/* Email */}
            <div className="text-[15px] font-normal text-black font-montserrat">
              Email: ong2221323@mkt.ceu.edu.ph
            </div>
            {/* Phone Number */}
            <div className="text-[15px] font-normal text-black font-montserrat mt-2">
              Phone Number: 0912 3456 789
            </div>
            <div className="text-[15px] font-normal text-black font-montserrat mt-2">
              Password: ***********
            </div>
            {/* Change Password */}
            <div className="mt-4 w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-montserrat font-bold rounded-full">
              <span className="text-center">CHANGE PASSWORD</span>
            </div>
          </div>
        </div>
        <div className="hover:bg-[#FFC840] hover:text-white absolute top-[390px] absolute left-[504px] w-[120px] text-[12px] h-[30px] flex items-center justify-center border-2 border-[#FFC840] text-black font-montserrat font-bold rounded-2xl">
          <span className="text-center">My History</span>
        </div>
        {/* Additional Content */}





        <div className="flex justify-between items-center absolute top-[430px] left-1/2 transform -translate-x-1/2 w-[900px] bg-[#FFC840] rounded-3xl p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] font-montserrat h-[35px] flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-montserrat font-bold text-black">
                Retirement (Premium) •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ralph Benedict Vicente
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Education (Basic)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ethan Araneta
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Health (Premium)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Althea Irish Manalo
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Auto (Standard)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Leamei Quiñanola
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Auto (Premium)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Justin Dennis Sauquillo
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] font-montserrat h-[35px] flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-montserrat font-bold text-black">
                Retirement (Premium) •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ralph Benedict Vicente
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Education (Basic)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ethan Araneta
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Health (Premium)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Althea Irish Manalo
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Auto (Standard)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Leamei Quiñanola
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:text-white hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
                <span className="text-center">View</span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Auto (Premium)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Justin Dennis Sauquillo
              </div>
            </div>
          </div>
          {/* Status */}
          <div className="absolute right-5 ml-2">
            <div className="text-[14px] font-normal text-black font-montserrat">
              Status: Accepted
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Pending Review
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Pending Review
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Pending Review
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Accepted
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Accepted
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Rejected
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Rejected
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Accepted
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Rejected
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom left-1/2 transform -translate-x-1/2 w-[200px] z-10">
        <button
          className="w-full text-black text-[14px] font-bold py-2 rounded-2xl border-1 hover:bg-[#FFC840] hover:text-white transition-all"
          style={{ cursor: "pointer" }}
        >
          View More
        </button>
      </div>
      <footer className="bg-[#FFC840] text-black py-4 mt-35">
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
};

export default Page;