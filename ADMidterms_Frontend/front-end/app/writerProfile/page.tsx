"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Page: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false); 
  const [username, setUsername] = useState("Ongskie");
  const [name, setName] = useState("John Benedict Ong");
  const [birthdate, setBirthdate] = useState<string>('November 1, 1988');
  const [age, setAge] = useState<number>(36);
  const [email, setEmail] = useState("ong2221323@mkt.ceu.edu.ph");
  const [phoneNumber, setPhoneNumber] = useState("0912 3456 789");
  const [password, setPassword] = useState<string>('password1234');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('password123456');
  const [passwordMatchError, setPasswordMatchError] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

// Function to calculate age based on birthdate
const calculateAge = (birthdate: string): number => {
  const birthDateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

// Update age when birthdate changes
useEffect(() => {
  if (birthdate) {
    setAge(calculateAge(birthdate));
  }
}, [birthdate]);

// Password validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Handle password change with proper type for event parameter
const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setPassword(value);

  // Check password validity
  if (!passwordRegex.test(value)) {
    setPasswordError("Password must contain at least one uppercase letter, one number, and one special character, and be at least 8 characters long.");
    setIsPasswordValid(false);
  } else {
    setPasswordError("");
    setIsPasswordValid(true);
  }
};

// Handle confirm password change
const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setConfirmPassword(value);

  // Check if passwords match
  if (value !== password) {
    setPasswordMatchError("Passwords do not match.");
  } else {
    setPasswordMatchError("");
  }
};

// Toggle change password mode
const handleChangePasswordClick = () => {
  setChangePasswordMode(!changePasswordMode);
  setPassword(""); // Optionally reset password field when changing mode
  setConfirmPassword(""); // Optionally reset confirm password field when changing mode
  setPasswordError(""); // Clear any previous errors
  setPasswordMatchError(""); // Clear match error
};

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSaveProfile = () => {
    // need to call API
    console.log("Profile saved:", { name, birthdate, age, email, phoneNumber });
    setIsEditing(false); 
  };

  const handleSavePassword = () => {
    // (needs API call)
    console.log("Password saved:", password);
    setChangePasswordMode(false); // Close password edit mode
  };

  // Toggle profile edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
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
      
      <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-[900px] h-[210px] bg-[#D9D9D9] rounded-3xl mb-1">
        <div className="shadow-2xl absolute left w-[210px] h-[210px] bg-[#FFFFFF] border-1 border-black rounded-3xl">
          <img src="/images/lumina.png" alt="Lumina Logo" className="absolute top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute left-[230px] top-[10px]">
          {/* Username */}
          <div className="text-[24px] font-semibold text-black font-montserrat">
          {isEditing ? (
              <input
                type="text"
                className="text-[15px] text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[200px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <div className="text-[24px text-black font-montserrat">Hello! {username}</div>
            )}
            </div>

          {/* Name */}
          <div className="mt-1">
            {isEditing ? (
              <input
                type="text"
                className="text-[15px] text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[200px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div className="text-[15px] text-black font-montserrat">Name: {name}</div>
            )}
          </div>

          {/* Birthdate */}
          <div className="mt-2">
            {isEditing ? (
              <input
                type="date"
                className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[200px]"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}  // Prevent future dates
              />
            ) : (
              <div className="text-[15px] text-black font-montserrat">Birthdate: {birthdate}</div>
            )}
          </div>

          {/* Age */}
          <div className="mt-2">
            <div className="text-[15px] text-black font-montserrat">Age: {age}</div>
          </div>

          {/* Edit Profile button */}
          <div
            onClick={handleEditClick}
            className="hover:bg-[#FFC840] hover:border-white absolute top-[150px] w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full"
          >
            <button className="text-center" style={{ cursor: "pointer" }}>
              {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
            </button>
          </div>
        </div>

        <div className="absolute right-[20px] top-[50px]">
          {/* Email */}
          <div className="flex items-center justify-between">
            {isEditing ? (
              <input
                type="email"
                className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className="text-[15px] font-normal text-black font-montserrat">Email: {email}</div>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between mt-2">
            {isEditing ? (
              <input
                type="tel"
                className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <div className="text-[15px] font-normal text-black font-montserrat">Phone Number: {phoneNumber}</div>
            )}
          </div>

          {/* Password */}
          <div className="flex items-center justify-between">
        {changePasswordMode ? (
          <div>
            <input
              type="password"
              className="text-[15px] font-normal mb-9 text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[20px] w-[150px]"
              value={password}
              onChange={handlePasswordChange}
              placeholder="New password"
            />
            <input
              type="password"
              className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[20px] w-[150px] ml-2 mt-2"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm"
            />
          </div>
        ) : (
          <div className="text-[15px] font-normal mt-2 text-black font-montserrat">
            Password: {password ? '***********' : 'No password set'}
          </div>
        )}

        {/* Change Password Button */}
          <div
            onClick={handleChangePasswordClick}
            className="absolute right hover:bg-[#FFC840] hover:border-white absolute top-[110px] w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full"
          >
            <button className="text-center" style={{ cursor: 'pointer' }}>
              {changePasswordMode ? "CANCEL" : "CHANGE PASSWORD"}
            </button>
          </div>

          {/* Save Password Button */}
          {changePasswordMode && (
            <div
              onClick={handleSavePassword}
              className={`hover:bg-[#FFC840] absolute left-[180px] hover:border-white absolute top-[110px] w-[100px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-montserrat font-bold rounded-full '}`}
            >
              <button className="text-center" style={{ cursor: !isPasswordValid || passwordMatchError ? 'not-allowed' : 'pointer' }}>
                SAVE
              </button>
              </div>
              )}
            </div>
          </div>
        </div>
          
        <div className="absolute top-[42vh] left-1/2 transform -translate-x-1/2 w-[900px] text-[12px] h-[30px] flex items-center justify-start text-black font-montserrat font-bold">
          <span className="shadow-lg px-3 py-1 rounded-2xl border-2 border-[#FFC840] ml-3 text-left">My History</span>
        </div>
        <div className="flex justify-between items-center absolute top-[430px] left-1/2 transform -translate-x-1/2 w-[900px] bg-[#FFC840] rounded-3xl p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] font-montserrat h-[35px] flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-montserrat font-bold text-black">
                Retirement (Premium) •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ralph Benedict Vicente
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Education (Basic)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ethan Araneta
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Health (Premium)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Althea Irish Manalo
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Auto (Standard)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Leamei Quiñanola
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Auto (Premium)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Justin Dennis Sauquillo
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] font-montserrat h-[35px] flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-montserrat font-bold text-black">
                Retirement (Premium) •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ralph Benedict Vicente
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Education (Basic)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Ethan Araneta
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Health (Premium)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Althea Irish Manalo
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Auto (Standard)  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Insured Name: Leamei Quiñanola
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:bg-[#FFC840] hover:border-white w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFFFFF] border-1 border-black text-black font-bold rounded-2xl">
              <Link href="/writerReviewApplicationForm">
              <button className="text-center" style={{ cursor: "pointer" }}> 
                View</button>
              </Link>
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
              Status: Under Review
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Under Review
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-6">
              Status: Under Review
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
      <div className="absolute bottom-[20vh] left-1/2 transform -translate-x-1/2 w-[400px]">
        <button
          className="w-full text-black text-[14px] font-bold py-1 rounded-2xl border-1 hover:bg-[#FFC840] hover:text-white transition-all"
          style={{ cursor: "pointer" }}
        >
          View More
        </button>
      </div>
      <footer className="bg-[#FFC840] text-black py-4 mt-45">
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