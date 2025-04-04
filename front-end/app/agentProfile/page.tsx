"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  contact_number: string;
}

export default function Page() {
  const router = useRouter();
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

  // Password validation regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (!userData) {
      router.push('/logIn');
      return;
    }
    const parsedUserData = JSON.parse(userData);
    fetchUserData(parsedUserData.user_id.toString());
  }, [router]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
        email: data.email,
        contact_number: data.contact_number,
      });
      setLoading(false);
    } catch (err) {
      setError('Error fetching user data');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!passwordRegex.test(value)) {
      setPasswordError("Password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
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

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userData.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Error updating profile');
    }
  };

  const handleChangePasswordClick = () => {
    setChangePasswordMode(!changePasswordMode);
    setPassword('');
    setCurrentPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordMatchError('');
  };

  const handleSavePassword = async () => {
    if (!isPasswordValid || password !== confirmPassword) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${userData.user_id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setChangePasswordMode(false);
      setSuccess('Password updated successfully');
    } catch (err) {
      setError('Error updating password');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <Link href="/agentHomepage">
              <img src="/images/lumina.png" alt="Lumina Logo" width="80" height="80" />
            </Link>
          </div>
          <div className="flex space-x-2">
            <Link href="#" className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">About Lumina</Link>
            <Link href="#" className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Policies</Link>
            <Link href="#" className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Claims and Services</Link>
            <Link href="/agentApplicationForm" className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Create Application Form</Link>
            <div className="flex items-center">
              <div className="bg-[#FFC840] rounded-full flex items-center h-[35px] pr-2">
                <Link href="/agentHomepage" className="px-6 text-[12px] text-black font-bold font-montserrat">HOMEPAGE</Link>
                <div className="h-[25px] bg-white rounded-full flex items-center">
                  <Link href="/" className="px-4 text-[12px] text-black font-bold font-montserrat">Logout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-[900px] h-[220px] bg-[#D9D9D9] rounded-3xl mb-1">
          <div className="shadow-2xl absolute left w-[220px] h-[220px] bg-[#FFFFFF] border-1 border-black rounded-3xl">
            <img src="/images/lumina.png" alt="Lumina Logo" className="absolute top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Left Side Content */}
          <div className="absolute left-[250px] top-[10px]">
            <div className="text-[24px] font-semibold text-black font-montserrat">
              Hello! {userData.username}
            </div>

            <div className="mt-2">
              {isEditing ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="text-[15px] text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[200px]"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    className="text-[15px] text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[200px]"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="Last Name"
                  />
                </div>
              ) : (
                <div className="text-[15px] text-black font-montserrat">
                  Name: {userData.first_name} {userData.last_name}
                </div>
              )}
            </div>

            <div className="mt-2">
              {isEditing ? (
                <input
                  type="date"
                  className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[200px]"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                />
              ) : (
                <div className="text-[15px] text-black font-montserrat">
                  Birthdate: {userData.date_of_birth ? new Date(userData.date_of_birth).toLocaleDateString() : 'Not set'}
                </div>
              )}
            </div>

            <div
              onClick={isEditing ? handleSaveProfile : handleEditClick}
              className="hover:bg-[#FFC840] hover:border-white absolute top-[140px] w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full cursor-pointer"
            >
              <button className="text-center w-full h-full">
                {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
              </button>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="absolute right-[20px] top-[50px]">
            {!changePasswordMode && (
              <>
                {/* Email */}
                <div className="flex items-center space-x-4">
                  {isEditing ? (
                    <input
                      type="email"
                      className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                    />
                  ) : (
                    <div className="text-[15px] font-normal text-black font-montserrat">
                      Email: {userData.email}
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex items-center space-x-4 mt-2">
                  {isEditing ? (
                    <input
                      type="tel"
                      className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                      value={formData.contact_number}
                      onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                      placeholder="Phone Number"
                    />
                  ) : (
                    <div className="text-[15px] font-normal text-black font-montserrat">
                      Phone Number: {userData.contact_number}
                    </div>
                  )}
                </div>

                {/* Password Section */}
                <div className="flex items-center space-x-4 mt-2">
                  <div className="text-[15px] font-normal text-black font-montserrat">
                    Password: ***********
                  </div>
                </div>
              </>
            )}

            {!changePasswordMode ? (
              <div
                onClick={handleChangePasswordClick}
                className="hover:bg-[#FFC840] hover:border-white absolute top-[100px] w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full cursor-pointer"
              >
                <button className="text-center w-full h-full">
                  CHANGE PASSWORD
                </button>
              </div>
            ) : (
              <div className="absolute top-[-20px] right-0 flex flex-col space-y-4">
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
                  className={`hover:bg-[#FFC840] hover:border-white w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full ${
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
            )}
          </div>
        </div>

        {/* My Clients Section */}
        <div className="absolute top-[400px] left-1/2 transform -translate-x-1/2 w-[900px]">
          <div className="text-[20px] font-bold text-black font-montserrat mb-4">
            My Clients
          </div>
          {/* Client list will be implemented here */}
        </div>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}
    </div>
  );
}