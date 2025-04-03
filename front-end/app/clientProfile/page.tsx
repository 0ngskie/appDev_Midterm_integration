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
  agent_id: number;
  agent_name?: string;
}

const Profile: React.FC = () => {
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
    agent_id: 0,
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!passwordRegex.test(value)) {
      setPasswordError("Password must contain at least one uppercase letter, one number, and one special character, and be at least 8 characters long.");
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

  const handleChangePasswordClick = () => {
    setChangePasswordMode(!changePasswordMode);
    setPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordMatchError("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

        // Validate current password is provided
        if (!currentPassword) {
            setError("Current password is required");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Validate new password requirements
        if (!passwordRegex.test(password)) {
            setError("Password must contain at least one uppercase letter, one number, and one special character, and be at least 8 characters long.");
            return;
        }

        // Send password update request
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
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {success && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {success}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <Link href="/clientHomepage">
              <img src="/images/lumina.png" alt="Lumina Logo" width="80" height="80" />
            </Link>
          </div>
          <div className="flex space-x-2">
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">About Lumina</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Policies</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">
              <Link href="/clientClaimsAndServices">Claims and Services</Link>
            </button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Talk with an Advisor</button>
            <div className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
              <Link href="/clientHomepage">HOMEPAGE</Link>
              <div 
                onClick={handleLogout}
                className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1 cursor-pointer"
              >
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute top-[300px] left-1/2 transform -translate-x-1/2 w-[900px] h-[200px] bg-[#D9D9D9] rounded-3xl mb-1">
          <div className="shadow-2xl absolute left w-[200px] h-[200px] bg-[#FFFFFF] border-1 border-black rounded-3xl">
            <img src="/images/lumina.png" alt="Lumina Logo" className="absolute top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute left-[230px] top-[10px]">
            {/* Username */}
            <div className="text-[24px] font-semibold text-black font-montserrat">
              Hello! {userData.username}
            </div>

            {/* Name */}
            <div className="mt-1">
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

            {/* Birthdate */}
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

            {/* Agent */}
            <div className="mt-2">
              <div className="text-[15px] text-black font-montserrat">
                Agent Name: {userData.agent_name || 'Not assigned'}
              </div>
            </div>

            {/* Edit Profile button */}
            <div
              onClick={isEditing ? handleSaveProfile : handleEditClick}
              className="hover:bg-[#FFC840] hover:border-white absolute top-[140px] w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full"
            >
              <button className="text-center" style={{ cursor: "pointer" }}>
                {isEditing ? "SAVE PROFILE" : "EDIT PROFILE"}
              </button>
            </div>
          </div>

          <div className="absolute right-[20px] top-[35px]">
            {/* Email */}
            {!changePasswordMode && (
              <div className="flex items-center justify-between mb-4">
                {isEditing ? (
                  <input
                    type="email"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <div className="text-[15px] font-normal text-black font-montserrat">
                    Email: {userData.email}
                  </div>
                )}
              </div>
            )}

            {/* Phone Number */}
            {!changePasswordMode && (
              <div className="flex items-center justify-between mb-4">
                {isEditing ? (
                  <input
                    type="tel"
                    className="text-[15px] font-normal text-black font-montserrat p-2 border border-gray-400 rounded-2xl h-[30px] w-[310px]"
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                  />
                ) : (
                  <div className="text-[15px] font-normal text-black font-montserrat">
                    Phone Number: {userData.contact_number}
                  </div>
                )}
              </div>
            )}

            {/* Password Section */}
            <div className="flex flex-col">
              {changePasswordMode ? (
                <div className="flex flex-col space-y-2">
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
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="text-[15px] font-normal text-black font-montserrat">
                    Password: ***********
                  </div>
                  <div
                    onClick={handleChangePasswordClick}
                    className="hover:bg-[#FFC840] hover:border-white w-[150px] text-[12px] h-[30px] flex items-center justify-center bg-[#FFC840] border-1 border-black text-black font-bold font-montserrat rounded-full cursor-pointer"
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
      </div>
    </div>
  );
};

export default Profile;