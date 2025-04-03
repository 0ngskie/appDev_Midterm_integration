"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false); 
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [username, setUsername] = useState("DBMercado");
  const [name, setName] = useState("Dave Mercado");
  const [birthdate, setBirthdate] = useState<string>('October 1, 1993');
  const [age, setAge] = useState<number>(31);
  const [email, setEmail] = useState("mercado2221464@mkt.ceu.edu.ph");
  const [phoneNumber, setPhoneNumber] = useState("0912 3456 789");
  const [password, setPassword] = useState<string>('password123456');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordMatchError, setPasswordMatchError] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
      <header className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
        <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
            <Link href="/agentHomepage">
              <img src="/images/lumina.png" alt="Lumina Logo" width="80" height="80" />
            </Link>
          </div>
          <div className="flex space-x-2">
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">About Lumina</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Policies</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Claims and Services</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold"><Link href="/agentApplicationForm">Create Application Form</Link></button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
            <span><Link href="/agentHomepage">HOMEPAGE</Link></span>
              <button className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1">
                <span><Link href="/">Logout</Link></span>
              </button>
            </button>
          </div>
        </div>
      </header>
      <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-[900px] h-[220px] bg-[#D9D9D9] rounded-3xl mb-1">
        <div className="shadow-2xl absolute left w-[220px] h-[220px] bg-[#FFFFFF] border-1 border-black rounded-3xl">
          <img src="/images/lumina.png" alt="Lumina Logo" className="absolute top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute left-[250px] top-[10px]">
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

          {/* Editable Name */}
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

          {/* Edit Profile */}
          <div
            onClick={handleEditClick}
            className="absolute top-[140px] hover:bg-[#FFC840] hover:border-white w-[150px] mt-3 text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full"
          >
            <button className="text-center" style={{ cursor: "pointer" }}>
              {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
            </button>
          </div>
        </div>
        <div className="absolute right-[20px] top-[50px]">

          {/* Editable Email */}
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

          {/* Editable Phone Number */}
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

          {/* Editable Password */}
          <div className="flex items-center justify-between ">
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
            className="hover:bg-[#FFC840] absolute left mt-3 absolute top-[100px] hover:border-white w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-montserrat font-bold rounded-full"
          >
            <button className="text-center" style={{ cursor: 'pointer' }}>
              {changePasswordMode ? "CANCEL" : "CHANGE PASSWORD"}
            </button>
          </div>

          {/* Save Password Button */}
          {changePasswordMode && (
            <div
              onClick={handleSavePassword}
              className={`hover:bg-[#FFC840] absolute left-[180px] absolute top-[100px] mt-3 hover:border-white w-[100px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-montserrat font-bold rounded-full '}`}
            >
              <button className="text-center" style={{ cursor: !isPasswordValid || passwordMatchError ? 'not-allowed' : 'pointer' }}>
                SAVE
              </button>
              </div>
              )}
            </div>
          </div>
        </div>
        
        {/* My Policies */}
        <div className="absolute top-[390px] left-1/2 transform -translate-x-1/2 w-[900px] text-[12px] h-[30px] flex items-center justify-start text-black font-montserrat font-bold">
          <span className="text-center px-3 py-1 rounded-2xl border-2 border-[#FFC840] shadow-lg">My Clients</span>
        </div>
         <div className="absolute top-[430px] left-1/2 transform -translate-x-1/2 w-[900px] h-[260px] border-2 border-[#FFC840] rounded-3xl mt-1 mb-1">
          <div className="absolute left-[20px] top-[10px] flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="hover:border-[#FFFFFF] hover:text-[#FFFFFF] w-[90px] text-[12px] font-montserrat h-[35px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold rounded-2xl">
              <span className="text-center"><Link href="/agentClientExample">View</Link></span>
              </div>
              <div className="text-[14px] font-montserrat font-bold text-black">
                Althea Irish Manalo •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Policies Owned:4
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:border-[#FFFFFF] hover:text-[#FFFFFF] w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold rounded-2xl">
              <span className="text-center"><Link href="/agentClientExample">View</Link></span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Leamei Quiñanola  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Policies Owned: 2
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:border-[#FFFFFF] hover:text-[#FFFFFF] w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold rounded-2xl">
              <span className="text-center"><Link href="/agentClientExample">View</Link></span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Philippe Dwaine Estacio  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Policies Owned: 5
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:border-[#FFFFFF] hover:text-[#FFFFFF] w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold rounded-2xl">
              <span className="text-center"><Link href="/agentClientExample">View</Link></span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Bianca Denise Inocencio  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Policies Owned: 1
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hover:border-[#FFFFFF] hover:text-[#FFFFFF] w-[90px] text-[12px] h-[35px] font-montserrat flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold rounded-2xl">
              <span className="text-center"><Link href="/agentClientExample">View</Link></span>
              </div>
              <div className="text-[14px] font-bold font-montserrat text-black">
                Miguelito Carandang  •
              </div>
              <div className="text-[14px] font-normal font-montserrat text-black">
                Policies Owned: 3
              </div>
            </div>
        </div>
        {/* Status */}
        <div className="absolute right-5 mt-4">
            <div className="text-[14px] font-normal text-black font-montserrat">
            Member Since: January 23, 2023
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-8">
            Member Since: April 30, 2024
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-8">
            Member Since: December 2, 2023
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-8">
            Member Since: August 6, 2025
            </div>
            <div className="text-[14px] font-normal text-black font-montserrat mt-8">
            Member Since: June 9, 2023
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#FFC840] text-black py-4">
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