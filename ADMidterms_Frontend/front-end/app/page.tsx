"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const Page: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            <img src="/images/lumina.png" alt="Lumina Logo" width="80" height="80" />
          </div>
          <div className="flex space-x-2">
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">About Lumina</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Policies</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Claim and Services</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Talk with an Advisor</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
              <span><Link href="/SignUp">REGISTER</Link></span>
              <div className="relative">
                <button onClick={toggleDropdown} className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1">
                  <span>Log-in</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#FFC840] border border-gray-300 rounded-lg shadow-lg">
                    <div className="py-1">
                      <button className="block w-full text-center px-4 py-2 text-sm text-black bg-white border-b border-[#FFC840] hover:bg-gray-100"><Link href="/logIn">Client</Link></button>
                      <button className="block w-full text-center px-4 py-2 text-sm text-black bg-white border-b border-[#FFC840] hover:bg-gray-100"><Link href="/logIn">Agent</Link></button>
                      <button className="block w-full text-center px-4 py-2 text-sm text-black bg-white hover:bg-gray-100"><Link href="/logIn">Writer</Link></button>
                    </div>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>
      <div className="relative flex items-center justify-center min-h-screen mt-10">
        <div className="text-black flex items-start space-x-4 relative">
          <img src="/images/shakeHands.png" alt="Shake Hands" className="w-90 h-90 -ml-0 relative" />
          <div className="font-montserrat text-lg mt-4">
            <p className="font-bold text-black">Welcome to Lumina Insurances</p>
            <p className="font-bold text-black">– where coverage is Light and Easy.</p>
            <p className="text-sm font-bold mt-8 text-black">Get started today and enjoy peace of mind with flexible plans for:</p>
            <div className="flex justify-center mt-4">
              <button className="bg-white text-black py-2 px-12 rounded-full text-[12px] font-montserrat font-bold border-2 border-[#FFC840] shadow-lg">Retirement</button>
              <button className="bg-white text-black py-2 px-12 rounded-full text-[12px] font-montserrat font-bold border-2 border-[#FFC840] shadow-lg">Education</button>
              <button className="bg-white text-black py-2 px-12 rounded-full text-[12px] font-montserrat font-bold border-2 border-[#FFC840] shadow-lg">Health</button>
              <button className="bg-white text-black py-2 px-12 rounded-full text-[12px] font-montserrat font-bold border-2 border-[#FFC840] shadow-lg">Auto</button>
            </div>
            <div className="mt-15 text-sm font-montserrat ml-15 text-black">
              <p>✔️ Explore personalized insurance plans</p>
              <p>✔️ Manage your policies in one place</p>
              <p>✔️ Access quick support and updates</p>
              <p className="mt-4">Let’s light the way to your secure future.</p>
              <button className="bg-[#FFC840] text-black py-2 px-8 rounded-lg text-[12px] font-montserrat font-bold mt-4">              <span><Link href="/SignUp">REGISTER</Link></span></button>
            </div>
          </div>
          <div className="absolute bottom-13 right-170 bg-white rounded-lg w-40 h-40 shadow-lg border-2 border-black" style={{ transform: 'translate(50%, 50%)' }}>
            <img src="/images/lumina.png" alt="Lumina Logo" className="w-40 h-40" />
          </div>
        </div>
      </div>
      <div className="text-center mt-16 bg-opacity-10" style={{ backgroundImage: 'url(/images/GLOW.png)', backgroundSize: '80%', backgroundPosition: 'center' }}>
        <h2 className="font-montserrat font-bold text-2xl text-black">Our Services</h2>
        <p className="font-montserrat text-lg mt-2 text-black">Explore flexible plans designed to support your goals and give you peace of mind:</p>
        <div className="flex justify-center mt-8 space-x-4">
          <div className="flex flex-col items-center">
            <div className="relative bg-[#FFC840] text-black h-80 w-64 rounded-lg text-[12px] font-montserrat font-bold shadow-lg flex items-center justify-center border border-black" style={{ backgroundImage: 'url(/images/img1.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col items-center justify-center p-2 rounded-b-lg" style={{ backgroundColor: 'rgba(255, 200, 64, 0.3)' }}>
                <span className="font-bold text-2xl">RETIREMENT</span>
                <p className="text-center text-xs mt-2 font-montserrat text-black">Secure your future with retirement plans built for comfort and confidence.</p>
              </div>
            </div>
            <button className="bg-[#FFC840] text-black py-2 px-16 rounded-lg text-[12px] font-montserrat font-bold mt-4 shadow-lg">Read More</button>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative bg-[#FFC840] text-black h-80 w-64 rounded-lg text-[12px] font-montserrat font-bold shadow-lg flex items-center justify-center border border-black" style={{ backgroundImage: 'url(/images/img2.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col items-center justify-center p-2 rounded-b-lg" style={{ backgroundColor: 'rgba(255, 200, 64, 0.3)' }}>
                <span className="font-bold text-2xl">EDUCATION</span>
                <p className="text-center text-xs mt-2">Invest in your children's dreams with affordable education coverage options.</p>
              </div>
            </div>
            <button className="bg-[#FFC840] text-black py-2 px-16 rounded-lg text-[12px] font-montserrat font-bold mt-4 shadow-lg">Read More</button>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative bg-[#FFC840] text-black h-80 w-64 rounded-lg text-[12px] font-montserrat font-bold shadow-lg flex items-center justify-center border border-black" style={{ backgroundImage: 'url(/images/img3.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col items-center justify-center p-2 rounded-b-lg" style={{ backgroundColor: 'rgba(255, 200, 64, 0.3)' }}>
                <span className="font-bold text-2xl">HEALTH</span>
                <p className="text-center text-xs mt-2">Stay covered with reliable health plans that prioritize your well-being.</p>
              </div>
            </div>
            <button className="bg-[#FFC840] text-black py-2 px-16 rounded-lg text-[12px] font-montserrat font-bold mt-4 shadow-lg">Read More</button>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative bg-[#FFC840] text-black h-80 w-64 rounded-lg text-[12px] font-montserrat font-bold shadow-lg flex items-center justify-center border border-black" style={{ backgroundImage: 'url(/images/img4.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col items-center justify-center p-2 rounded-b-lg" style={{ backgroundColor: 'rgba(255, 200, 64, 0.3)' }}>
                <span className="font-bold text-2xl">AUTO</span>
                <p className="text-center text-xs mt-2">Drive with confidence knowing your vehicle is backed by dependable coverage.</p>
              </div>
            </div>
            <button className="bg-[#FFC840] text-black py-2 px-16 rounded-lg text-[12px] font-montserrat font-bold mt-4 shadow-lg">Read More</button>
          </div>
        </div>
      </div>
      <div className="mt-32 mx-auto p-8 rounded-lg shadow-lg max-w-6xl border-2 border-black flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FFC840, #FBFBFB)' }}>
          <div className="flex flex-col items-center">
            <h3 className="font-montserrat text-2xl text-black mb-4 text-center font-bold">
              Why <br /> Choose <br /> Lumina?
            </h3>
          </div>
          <div className="ml-8 flex flex-col justify-center items-start">
            <div className="flex items-center mb-4">
              <span className="font-montserrat text-sm text-black">💡</span>
              <p className="font-montserrat text-sm text-black ml-2">Simple process – No complicated steps</p>
            </div>
            <div className="flex items-center mb-4">
              <span className="font-montserrat text-sm text-black">📱</span>
              <p className="font-montserrat text-sm text-black ml-2">Easy access – Manage your account anytime, anywhere</p>
            </div>
            <div className="flex items-center mb-4">
              <span className="font-montserrat text-sm text-black">💬</span>
              <p className="font-montserrat text-sm text-black ml-2">Reliable support – Our team is here when you need us</p>
            </div>
            <div className="flex items-center">
              <span className="font-montserrat text-sm text-black">💰</span>
              <p className="font-montserrat text-sm text-black ml-2">Affordable plans – Quality coverage that fits your budget</p>
            </div>
          </div>
          </div>
      <footer className="bg-[#FFC840] text-black py-1 mt-16">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col items-start">
            <div className="flex space-x-2">
              <a href="#" className="font-montserrat text-xs font-bold">Our Team</a>
              <a href="#" className="font-montserrat text-xs font-bold">Contact Us</a>
              <a href="#" className="font-montserrat text-xs font-bold">Terms and Conditions</a>
            </div>
            <div className="flex items-center mt-1">
              <img src="/images/mail.png" alt="Email" className="h-3 w-3 mr-1" />
              <p className="font-montserrat text-xs font-bold">lumina.insurances@gmail.com</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <p className="font-montserrat text-xs font-bold">© 2025 Lumina Insurances. All rights reserved.</p>
            <div className="flex justify-center items-center space-x-2 mt-1">
              <img src="/images/Facebook.png" alt="Facebook" className="h-4 w-4" />
              <img src="/images/LinkedIn.png" alt="LinkedIn" className="h-4 w-4" />
              <img src="/images/Instagram.png" alt="Instagram" className="h-4 w-4" />
              <img src="/images/X.png" alt="X" className="h-4 w-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;