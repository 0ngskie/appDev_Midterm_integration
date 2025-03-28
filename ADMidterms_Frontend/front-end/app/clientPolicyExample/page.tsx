"use client";

import Link from "next/link";
import React from "react";

const PolicyCertificate: React.FC = () => {
    return (
        <div className="relative">
            <div className="absolute rounded-lg right-10">
              <Link href="/clientHomepage">
                <button className="bg-[#FFC840] text-black py-3 px-10 rounded-lg text-sm font-bold shadow-none hover:shadow-inner transition-shadow duration-300">
                  Back
                </button>
              </Link>
            </div>

            <div className="min-h-screen bg-white text-black font-montserrat px-6 py-8 relative max-w-5xl mx-auto border-3 border-3-gray-300 shadow-lg mt-8 mb-8">

                <div className="flex items-start">
                    <div className="flex flex-col items-start">
                        <img src="/images/lumina.png" alt="Lumina Logo" className="h-30" />
                    </div>
                    <div className="text-right ml-auto">
                        <h1 className="text-xl font-bold">Certificate of Insurance</h1>
                        <p className="text-sm">Policy Effective Date: <strong>January 1, 2025</strong></p>
                        <p className="text-sm">Policy Number: <strong>12345</strong></p>
                    </div>
                </div>

                {/* Section: GENERAL INFORMATION */}
                <div className="bg-[#FFC840] font-bold text-center py-2 text-lg mb-4">
                    GENERAL INFORMATION
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-4 p-6">

                    {/* Insured Info */}
                    <div>
                        <h2 className="font-bold text-lg mb-4">Insured Information</h2>
                        <div className="space-y-4">
                            <div className="border rounded p-2">
                                <label className="text-sm">Insured Name</label><br />
                                <span className="font-bold">Ralph Benedict Vicente</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded p-2">
                                    <label className="text-sm">Issue Age</label><br />
                                    <span className="font-bold">20</span>
                                </div>
                                <div className="border rounded p-2">
                                    <label className="text-sm">Sex</label><br />
                                    <span className="font-bold">Male</span>
                                </div>
                            </div>
                            <div className="border rounded p-2">
                                <label className="text-sm">Relationship to the Owner</label><br />
                                <span className="font-bold">Wife</span>
                            </div>
                        </div>
                    </div>

                    {/* Owner Info */}
                    <div>
                        <h2 className="font-bold text-lg mb-4">Owner/Applicant Information</h2>
                        <div className="grid grid-cols-2 gap-4">

                            <div className="space-y-4">
                                <div className="border rounded p-2">
                                    <label className="text-sm">Name</label><br />
                                    <span className="font-bold">Althea Irish Manalo</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border rounded p-2">
                                        <label className="text-sm">Birthdate</label><br />
                                        <span className="font-bold">Dec 30, 2003</span>
                                    </div>
                                    <div className="border rounded p-2">
                                        <label className="text-sm">Birthplace</label><br />
                                        <span className="font-bold">Makati City</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border rounded p-2">
                                        <label className="text-sm">Issue Age</label><br />
                                        <span className="font-bold">16</span>
                                    </div>
                                    <div className="border rounded p-2">
                                        <label className="text-sm">Sex</label><br />
                                        <span className="font-bold">Female</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border rounded p-2">
                                    <label className="text-sm">Civil Status</label><br />
                                    <span className="font-bold">Married</span>
                                </div>

                                <div className="border rounded p-2">
                                    <label className="text-sm">Nationality</label><br />
                                    <span className="font-bold">Filipino</span>
                                </div>

                                <div className="border rounded p-2">
                                    <label className="text-sm">Email</label><br />
                                    <span className="font-bold">manalo2221641@mkt.ceu.edu.ph</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="px-6 pb-6">
                    <h2 className="font-bold text-lg mb-4">Address of the Owner/Applicant</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="border rounded p-2">
                            <label className="text-sm">Street Address</label><br />
                            <span className="font-bold">IT Street</span>
                        </div>
                        <div className="border rounded p-2">
                            <label className="text-sm">Barangay</label><br />
                            <span className="font-bold">Cuteness Overload</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="border rounded p-2">
                            <label className="text-sm">State/Province</label><br />
                            <span className="font-bold">Metro Manila</span>
                        </div>
                        <div className="border rounded p-2">
                            <label className="text-sm">City Address</label><br />
                            <span className="font-bold">Makati City</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded p-2">
                            <label className="text-sm">Zip/Postal Code</label><br />
                            <span className="font-bold">1234</span>
                        </div>
                        <div className="border rounded p-2">
                            <label className="text-sm">Country</label><br />
                            <span className="font-bold">Philippines</span>
                        </div>
                    </div>
                </div>

                {/* Section: POLICY INFORMATION */}
                <div className="bg-[#FFC840] font-bold text-center py-1 mb-4">POLICY INFORMATION</div>

                <div className="mb-6 text-sm">
                    <p><strong>Lumina Insurances - Retirement Premium Plan</strong></p>
                    <p>Secure your golden years with comfort and confidence.</p><br />
                    <p><strong>Policy Overview</strong> <br /> The Retirement Premium Plan is designed for individuals who want comprehensive financial protection and peace of mind during retirement. This plan ensures long-term security, healthcare support, and family benefits, all tailored to make your retirement truly worry-free.</p>
                    <br />
                    <p className="font-semibold">Coverage Details</p>
                    <ul className="list-disc list-inside ml-4">
                        <li><strong>Retirement Lump Sum</strong><br />  Receive a ₱5,000,000 tax-free payout upon reaching the retirement age of 60.</li><br />
                        <li><strong>Long-Term Care Support</strong><br />  Includes an annual allowance of ₱100,000 for healthcare, medication, and assisted living, starting from age 60.</li><br />
                        <li><strong>Family Pension</strong> <br />In the event of policyholder’s passing, the family will receive a monthly pension of ₱15,000 for the next 5 years.</li><br />
                        <li><strong>Annual Loyalty Bonus</strong><br /> Starting from the 10th year of continuous premium payment, earn a 3% bonus annually on your accumulated fund value.</li>
                    </ul>
                    <br />
                    <p className="font-semibold">Premium Information</p>
                    <ul className="list-disc list-inside ml-4">
                        <li><strong>Monthly Payment:</strong> ₱7,000</li>
                        <li><strong>Quarterly Option:</strong> ₱20,000</li>
                        <li><strong>Payment Due Date:</strong> Every 15th of the month (<span className="underline">Selected Plan: Monthly</span>)</li>
                        <li><strong>Payment Term:</strong> Until age 60 or minimum of 20 years</li>
                    </ul>
                    <br />
                    <p className="font-semibold">Key Benefits</p>
                    <p>• Guaranteed Retirement Payout &nbsp; • Comprehensive Health and Care Coverage &nbsp; • Family Pension Support <br />
                        • Flexible Payment Options &nbsp; • Dedicated Account Management</p>
                </div>

                {/* Section: BENEFICIARIES */}
                <div className="bg-[#FFC840] font-bold text-center py-1 mb-4">BENEFICIARIES</div>

                {/* Beneficiaries Grid: 4 columns (Name, Birthdate, Sex, Relationship) */}
                <div className="grid grid-cols-4 gap-4 text-sm mb-6">

                    {/* Beneficiary 1 */}
                    <div className="border p-2 rounded">
                        <p><strong>Name</strong><br /> Hannah Louisa Vicente</p>
                    </div>
                    <div className="border p-2 rounded">
                        <p><strong>Birthdate</strong><br /> Jun 9, 2015</p>
                    </div>
                    <div className="border p-2 rounded">
                        <p><strong>Sex</strong><br /> Female</p>
                    </div>
                    <div className="border p-2 rounded">
                        <p><strong>Relationship to the Insured</strong><br /> Daughter</p>
                    </div>

                    {/* Beneficiary 2 */}
                    <div className="border p-2 rounded">
                        <p><strong>Name</strong><br /> Justin Dennis Vicente</p>
                    </div>
                    <div className="border p-2 rounded">
                        <p><strong>Birthdate</strong><br /> Oct 31, 2016</p>
                    </div>
                    <div className="border p-2 rounded">
                        <p><strong>Sex</strong><br /> Male</p>
                    </div>
                    <div className="border p-2 rounded">
                        <p><strong>Relationship to the Insured</strong><br /> Son</p>
                    </div>

                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Name</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Birthdate</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Sex</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Relationship to the Insured</strong><br /> Empty Slot</p>
                    </div>

                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Name</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Birthdate</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Sex</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Relationship to the Insured</strong><br /> Empty Slot</p>
                    </div>

                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Name</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Birthdate</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Sex</strong><br /> Empty Slot</p>
                    </div>
                    <div className="border p-2 rounded bg-gray-200 text-gray-400">
                        <p><strong>Relationship to the Insured</strong><br /> Empty Slot</p>
                    </div>
                </div>

                <hr className="border-t-30 border-gray-400 my-4" style={{ borderColor: '#919191' }} />

                {/* Disclaimer */}
                <div className="text-xs text-justify leading-snug space-y-2 border-3-t border-3-gray-300 pt-4">
                    <p><strong>Disclaimer:</strong> This Retirement Premium Plan is a legally binding document between the policyholder and Lumina Insurances. All benefits, terms, and conditions are subject to the company’s underwriting guidelines and may vary based on eligibility and risk assessment. The policyholder is advised to review all terms thoroughly before signing.</p>
                    <p><strong>Data Privacy:</strong> Lumina Insurances is committed to protecting your personal data. All information provided in this document will be used solely for policy processing and administration, in accordance with the Data Privacy Act of 2012.</p>
                    <p>Need Assistance? Contact us at (02) 1234-5678 or email support@lumina.com.ph. Visit our website at <a href="https://www.luminainsurances.com" className="underline text-blue-600">www.luminainsurances.com</a>.</p>
                </div>

                {/* Signatures */}
                <div className="flex items-start mb-6 text-sm mt-20">
                    <div className="text-center w-1/2">
                        <p className="font-bold uppercase">DAVE MERCADO</p>
                        <div className="border-t border w-3/4 mx-auto my-2"></div> {/* Line below the name */}
                        <p>Insurance Agent Name and Signature</p>
                        <p className="mt-1">December 20, 2025</p>
                    </div>

                    {/* Logo in between signatures */}
                    <div className="flex justify-center items-center w-1/6">
                        <img src="/images/lumina.png" alt="Lumina Logo" className="h-30" />
                    </div>

                    <div className="text-center w-1/2">
                        <p className="font-bold uppercase">ALTHEA IRISH MANALO</p>
                        <div className="border-t border w-3/4 mx-auto my-2"></div> {/* Line below the name */}
                        <p>Client Name and Signature</p>
                        <p className="mt-1">December 20, 2025</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PolicyCertificate;
