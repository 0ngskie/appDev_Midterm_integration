"use client";

import Link from 'next/link';
import React from 'react';

const Page: React.FC = () => {
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
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold"><Link href="/agentApplicationForm  ">Create Application Form</Link></button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
            <span><Link href="/agentProfile">MY PROFILE</Link></span>
              <button className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1">
                <span><Link href="/">Logout</Link></span>
              </button>
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
            <p className="text-sm  mt-8 text-black">
              As a Lumina Insurance Agent,<br />
              you are the light that guides our clients toward financial security and peace of mind.<br />
              This portal is built to support your work, streamline your tools, and celebrate your success.
            </p>
            <div className="flex flex-col items-center mt-15 space-y-4 ] ml-[-100px]">
              <button className="bg-white text-black py-2 px-12 rounded-full text-[12px] font-montserrat font-bold border-2 border-[#FFC840] shadow-lg w-full max-w-xs">Manage Clients with ease</button>
              <button className="bg-white text-black py-2 px-12 rounded-full text-[12px] font-montserrat font-bold border-2 border-[#FFC840] shadow-lg w-full max-w-xs">Submit and Process Applications</button>
              <button className="bg-white text-black py-2 px-12 rounded-full text-[12px] font-montserrat font-bold border-2 border-[#FFC840] shadow-lg w-full max-w-xs">Your Performance, Your Growth</button>
            </div>
          </div>
          <div className="absolute bottom-13 right-170 bg-white rounded-lg w-40 h-40 shadow-lg border-2 border-black" style={{ transform: 'translate(50%, 50%)' }}>
            <img src="/images/lumina.png" alt="Lumina Logo" className="w-40 h-40" />
          </div>
        </div>
      </div>
      <div className="text-center mt-16 bg-opacity-10" style={{ backgroundImage: 'url(/images/GLOW.png)', backgroundSize: '80%', backgroundPosition: 'center' }}>
        <h2 className="font-montserrat font-bold text-2xl text-black">Policies to Offer</h2>
        <p className="font-montserrat text-lg mt-2 text-black">Explore flexible plans designed to support your client’s goals and give them peace of mind:</p>
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