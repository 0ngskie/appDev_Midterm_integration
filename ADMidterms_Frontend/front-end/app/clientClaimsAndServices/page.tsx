"use client";

import Link from 'next/link';
import React from 'react';

const ClaimsAndServices: React.FC = () => {
    return (
        <div className="text-black min-h-screen bg-white relative">
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
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold"><Link href="/clientClaimsAndServices">Claims and Services</Link></button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Talk with an Advisor</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
            <span><Link href="/clientProfile">MY PROFILE</Link></span>
              <button className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1">
                <span><Link href="/">Logout</Link></span>
              </button>
            </button>
          </div>
        </div>
      </header>

            <main className="flex flex-col items-center justify-center text-center px-10 py-16 max-w-6xl mx-auto">
                <img src="/images/bulb.png" alt="png" className="h-40 w-40 mb-6 mt-20" />
                <h1 className="text-3xl font-bold font-montserrat">Claims & Services - Light and Easy Support When You Need It Most</h1>
                <p className="text-black mt-4 font-montserrat max-w-5xl text-2xl">
                    At Lumina Insurances, we believe that accessing your coverage and getting support should be as straightforward as possible. We've designed our claims and services to be light and easy, ensuring you can focus on what matters most, knowing we're here for you.
                </p>

                <h2 className="font-bold font-montserrat mt-6 text-2xl">Accessing Our Services: Your Coverage at Your Fingertips.</h2>
                <p className="text-black font-montserrat max-w-5xl text-2xl">
                    Managing your insurance should be simple and convenient. With Lumina Insurances, you have easy access to all the information and tools you need.
                </p>

                <h2 className="font-bold font-montserrat mt-6 text-2xl">Making a Claim? We've Got You Covered.</h2>
                <p className="text-black font-montserrat max-w-5xl text-2xl">
                    We understand that filing a claim can be a stressful time. That's why we've streamlined the process to be as efficient and hassle-free as possible.
                </p>

                <Link href="/clientClaimSubmission">
                    <button className="bg-[#FFC840] text-black py-3 px-6 rounded-lg font-montserrat font-bold mt-6">SUBMIT CLAIMS</button>
                </Link>
            </main>

            <footer className="bg-[#FFC840] text-black py-4 mt-2">
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

export default ClaimsAndServices;