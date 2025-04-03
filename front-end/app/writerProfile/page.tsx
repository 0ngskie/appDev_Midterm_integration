"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface UserData {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  contact_number: string;
}

const Page: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // User data state
  const [userData, setUserData] = useState<UserData>({
    user_id: 0,
    username: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    contact_number: "",
  });

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    contact_number: "",
  });

  // Password state
  const [password, setPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
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

  // Password validation regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from storage
        const storedUserData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        if (!storedUserData) {
          router.push('/logIn');
          return;
        }

        const { user_id } = JSON.parse(storedUserData);
        
        // Fetch complete user profile
        const response = await fetch(`http://localhost:5000/api/users/${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split('T')[0] : '',
          email: data.email,
          contact_number: data.contact_number,
        });
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Update age when birthdate changes
  useEffect(() => {
    if (userData.date_of_birth) {
      calculateAge(userData.date_of_birth);
    }
  }, [userData.date_of_birth]);

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(`http://localhost:5000/api/users/${userData.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!currentPassword) {
        setError("Current password is required");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!passwordRegex.test(password)) {
        setError("Password must contain at least one uppercase letter, one number, and one special character, and be at least 8 characters long.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/users/${userData.user_id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: password
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      setSuccess('Password updated successfully');
      setChangePasswordMode(false);
      setPassword("");
      setCurrentPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error('Password update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        date_of_birth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : '',
        email: userData.email,
        contact_number: userData.contact_number,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
              onClick={() => router.push('/writerReviewPolicy')}
            >
              Review Policy Requests
            </button>
            <button
              className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold"
              onClick={() => router.push('/writerReviewClaims')}
            >
              Review Claims
            </button>
            <div className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
              <span
                className="cursor-pointer"
                onClick={() => router.push('/writerProfile')}
              >
                MY PROFILE
              </span>
              <div
                className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1 cursor-pointer"
                onClick={handleLogout}
              >
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-[900px] h-[210px] bg-[#D9D9D9] rounded-3xl mb-1">
          <div className="shadow-2xl absolute left-0 w-[210px] h-[210px] bg-[#FFFFFF] border-1 border-black rounded-3xl">
            <img src="/images/lumina.png" alt="Lumina Logo" className="absolute top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <span className="shadow-lg px-3 py-1 rounded-2xl border-2 border-[#FFC840] text-[12px] font-montserrat font-bold">My History</span>
            </div>
          </div>

          {/* Left side content */}
          <div className="absolute left-[230px] top-[20px]">
            {/* Username */}
            <div className="text-[24px] font-semibold text-black font-montserrat mb-4">
              Hello! {userData.username}
            </div>

            {/* Name */}
            <div className="mb-3">
              <div className="text-[15px] text-black font-montserrat">
                Name: {isEditing ? (
                  <div className="inline-flex gap-2">
                    <input
                      type="text"
                      className="text-[15px] text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[150px]"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      className="text-[15px] text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[150px]"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  <span>{userData.first_name} {userData.last_name}</span>
                )}
              </div>
            </div>

            {/* Birthdate */}
            <div className="mb-3">
              <div className="text-[15px] text-black font-montserrat">
                Birthdate: {isEditing ? (
                  <input
                    type="date"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[200px]"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    max={new Date().toISOString().split('T')[0]}
                  />
                ) : (
                  userData.date_of_birth
                )}
              </div>
            </div>

            {/* Age */}
            <div className="mb-4">
              <div className="text-[15px] text-black font-montserrat">
                Age: {calculateAge(userData.date_of_birth)}
              </div>
            </div>

            {/* Edit Profile button */}
            <div
              onClick={isEditing ? handleSaveProfile : handleEditClick}
              className="hover:bg-[#FFC840] hover:border-white absolute bottom-[20px] w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full cursor-pointer"
            >
              <button className="text-center w-full h-full">
                {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
              </button>
            </div>
          </div>

          {/* Right side content */}
          <div className="absolute right-[20px] top-[20px]">
            {/* Email */}
            <div className="mb-4">
              <div className="text-[15px] font-normal text-black font-montserrat">
                Email: {isEditing ? (
                  <input
                    type="email"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                  />
                ) : (
                  userData.email
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <div className="text-[15px] font-normal text-black font-montserrat">
                Phone Number: {isEditing ? (
                  <input
                    type="tel"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    placeholder="Phone Number"
                  />
                ) : (
                  userData.contact_number
                )}
              </div>
            </div>

            {/* Password Section */}
            <div className="text-[15px] font-normal text-black font-montserrat">
              Password: {changePasswordMode ? (
                <div className="mt-2 flex flex-col space-y-3">
                  <input
                    type="password"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                  />
                  <input
                    type="password"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="New password"
                  />
                  <input
                    type="password"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm password"
                  />
                  <div
                    onClick={handleSavePassword}
                    className={`hover:bg-[#FFC840] hover:border-white absolute right-0 bottom-[20px] w-[170px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full ${
                      !currentPassword || !isPasswordValid || passwordMatchError ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <button 
                      className="text-center w-full h-full" 
                      disabled={!currentPassword || !isPasswordValid || !!passwordMatchError}
                    >
                      SAVE PASSWORD
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="mr-4">***********</span>
                  <div
                    onClick={handleChangePasswordClick}
                    className="hover:bg-[#FFC840] hover:border-white absolute right-0 bottom-[20px] w-[170px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full cursor-pointer"
                  >
                    <button className="text-center w-full h-full">
                      CHANGE PASSWORD
                    </button>
                  </div>
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