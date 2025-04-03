"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
const PolicyCertificate: React.FC = () => {
    const router = useRouter(); // Initialize the router

    return (
        <div className="relative">
            <div className="absolute rounded-lg right-10">
                <button
                    onClick={() => router.back()}
                    className="bg-[#FFC840] text-black py-3 px-10 rounded-lg text-sm font-bold shadow-none hover:shadow-inner transition-shadow duration-300">
                    Back
                </button>
            </div>

            <div className="text-black text-center mt-8">
                <h1 className="text-2xl font-bold mb-6">Review Policy Application</h1>
                <p>Agent Name: Dave Mercado</p>
                <p>Status: Pending Review</p>
            </div>
            
            {/* Form Sheet */}
            <div className="bg-gray-100 text-black font-montserrat px-6 py-8 relative max-w-5xl mx-auto rounded border-3 border-3-gray-300 shadow-lg mt-8 mb-8">

                <div className="flex items-start">
                    <div className="flex flex-col items-start">
                        <img src="/images/lumina.png" alt="Lumina Logo" className="h-30" />
                    </div>
                    <div className="text-right ml-auto">
                        <h1 className="text-xl font-bold">Certificate of Insurance</h1>
                        <div className="bg-white rounded border-2 text-left pl-2 mt-2 mb-2">
                            <label className="text-sm">January 1, 2025</label>
                        </div>
                        <div className="bg-white rounded border-2 text-left pl-2">
                            <label className="text-sm">#12345</label>
                        </div>
                    </div>
                </div>

                {/* Section: GENERAL INFORMATION */}
                <div className="bg-[#FFC840] font-bold text-center py-2 text-lg mb-4 -mx-6">
                    GENERAL INFORMATION
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-4 p-6">

                    {/* Insured Info */}
                    <div>
                        <h2 className="font-bold text-lg mb-4">Insured Information</h2>
                        <div className="space-y-4">
                            <div className="bg-white rounded border-2 p-2">
                                <label className="text-sm">Insured Name</label><br />
                                <span className="font-bold"></span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded border-2 p-2">
                                    <label className="text-sm">Issue Age</label><br />
                                    <span className="font-bold"></span>
                                </div>
                                <div className="bg-white rounded border-2 p-2">
                                    <label className="text-sm">Sex</label><br />
                                    <span className="font-bold"></span>
                                </div>
                            </div>
                            <div className="bg-white rounded border-2 p-2">
                                <label className="text-sm">Relationship to the Owner</label><br />
                                <span className="font-bold"></span>
                            </div>
                        </div>
                    </div>

                    {/* Owner Info */}
                    <div>
                        <h2 className="font-bold text-lg mb-4">Owner/Applicant Information</h2>
                        <div className="grid grid-cols-2 gap-4">

                            <div className="space-y-4">
                                <div className="bg-white rounded border-2 p-2">
                                    <label className="text-sm">Name</label><br />
                                    <span className="font-bold"></span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded border-2 p-2">
                                        <label className="text-sm">Birthdate</label><br />
                                        <span className="font-bold"></span>
                                    </div>
                                    <div className="bg-white rounded border-2 p-2">
                                        <label className="text-sm">Birthplace</label><br />
                                        <span className="font-bold"></span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded border-2 p-2">
                                        <label className="text-sm">Issue Age</label><br />
                                        <span className="font-bold"></span>
                                    </div>
                                    <div className="bg-white rounded border-2 p-2">
                                        <label className="text-sm">Sex</label><br />
                                        <span className="font-bold"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white rounded border-2 p-2">
                                    <label className="text-sm">Civil Status</label><br />
                                    <span className="font-bold"></span>
                                </div>

                                <div className="bg-white rounded border-2 p-2">
                                    <label className="text-sm">Nationality</label><br />
                                    <span className="font-bold"></span>
                                </div>

                                <div className="bg-white rounded border-2 p-2">
                                    <label className="text-sm">Email</label><br />
                                    <span className="font-bold"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="px-6 pb-6">
                    <h2 className="font-bold text-lg mb-4">Address of the Owner/Applicant</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white rounded border-2 p-2">
                            <label className="text-sm">Street Address</label><br />
                            <span className="font-bold"></span>
                        </div>
                        <div className="bg-white rounded border-2 p-2">
                            <label className="text-sm">Barangay</label><br />
                            <span className="font-bold"></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white rounded border-2 p-2">
                            <label className="text-sm">State/Province</label><br />
                            <span className="font-bold"> </span>
                        </div>
                        <div className="bg-white rounded border-2 p-2">
                            <label className="text-sm">City Address</label><br />
                            <span className="font-bold"> </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded border-2 p-2">
                            <label className="text-sm">Zip/Postal Code</label><br />
                            <span className="font-bold"></span>
                        </div>
                        <div className="bg-white rounded border-2 p-2">
                            <label className="text-sm">Country</label><br />
                            <span className="font-bold"></span>
                        </div>
                    </div>
                </div>

                {/* Section: POLICY INFORMATION */}
                <div className="bg-[#FFC840] font-bold text-center py-2 text-lg mb-4 -mx-6">POLICY SELECTION</div>

                <div className=" mb-6 text-sm">
                    <p><strong>Select Policy Type(s)</strong></p>
                    <p>(Agent must discuss and indicate the chosen tier for each selected policy type.)</p><br />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div>
                            {/* Retirement Plan */}
                            <p className="ml-4 font-semibold">• Retirement Plan</p>
                            <div className="ml-4">
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Basic – ₱1.2M at the age of 60 (₱2,000/mo) for 20 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Standard – ₱2.5M + Healthcare (₱3,800/mo) for 25 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Premium – ₱5M + Family Pension (₱7,000/mo) until age 60 (min. 20 years)</label>
                            </div><br />

                            {/* Health Insurance */}
                            <p className="ml-4 font-semibold">• Health Insurance</p>
                            <div className="ml-4">
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Basic – ₱150K/year (₱1,000/mo) for 5 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Standard – ₱400K/year + OPD (₱2,200/mo) for 10 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Premium – ₱1M/year + Dental/Maternity (₱4,500/mo) for 15 years</label>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Education Plan */}
                            <p className="ml-4 font-semibold">• Education Plan</p>
                            <div className="ml-4">
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Basic – ₱100K/year for 4 years (₱1,200/mo) for 10 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Standard – ₱200K/year for 5 years (₱2,000/mo) for 12 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Premium – ₱300K/year + Laptop (₱3,500/mo) for 15 years</label>
                            </div><br />

                            {/* Auto Insurance */}
                            <p className="ml-4 font-semibold">• Auto Insurance</p>
                            <div className="ml-4">
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Basic – ₱300K coverage (₱900/mo) for 3 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Standard – ₱700K coverage + roadside assist (₱1,600/mo) for 5 years</label>
                                <label className="block"><input type="radio" name="plan" className="mr-2" />Premium – ₱1.5M coverage + Car Replacement (₱2,800/mo) for 7 years</label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section: PAYMENT DETAILS */}
                <div className="bg-[#FFC840] font-bold text-center py-2 text-lg mb-4 -mx-6">PAYMENT DETAILS</div>

                <div className="text-sm py-4 space-y-4">
                    {/* Payment Frequency */}
                    <div className="ml-4 flex flex-wrap items-center gap-4">
                        <label className="font-semibold">Payment Frequency:</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />Monthly</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />Quarterly</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />Bi-Annually</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />Annually</label>
                    </div>

                    {/* Preferred Due Date */}
                    <div className="ml-4 flex flex-wrap items-center gap-2">
                        <label className="font-semibold">Preferred Due Date:</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />1st</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />5th</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />10th</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />15th</label>
                        <label><input type="radio" name="payment frequency" className="mr-1" />30th</label>
                    </div>

                    {/* Payment Method */}
                    <div className="ml-4 flex flex-wrap items-center gap-4 mb-4">
                        <label className="font-semibold">Payment Method:</label>
                        <label><input type="radio" name="payment method" className="mr-1" />Bank Transfer</label>
                        <label><input type="radio" name="payment method" className="mr-1" />GCash</label>
                        <label><input type="radio" name="payment method" className="mr-1" />Credit/Debit</label>
                        <label className="flex items-center">
                            <input type="radio" name="payment method" className="mr-1" />
                            Others: <input type="text" className="ml-2 border-b border-black w-32 outline-none" />
                        </label>
                    </div>
                </div>

                {/* Section: SUPPORTING DOCUMENTS CHECKLIST */}
                <div className="bg-[#FFC840] font-bold text-center py-2 text-lg mb-4 -mx-6">SUPPORTING DOCUMENTS CHECKLIST</div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm py-4 px-6">
                    <label><input type="checkbox" className="mr-2" />Valid Government ID</label>
                    <label><input type="checkbox" className="mr-2" />Proof of Income</label>
                    <label><input type="checkbox" className="mr-2" />Health Declaration Form (for Health/Retirement)</label>
                    <label><input type="checkbox" className="mr-2" />Vehicle Info (for Auto)</label>
                    <label><input type="checkbox" className="mr-2" />Birth Certificate/School Docs (for Education Plan)</label>
                </div>

                {/* Section: BENEFICIARIES */}
                <div className="bg-[#FFC840] font-bold text-center py-2 text-lg mb-4 -mx-6">BENEFICIARIES</div>

                {/* Beneficiaries Grid: 6 columns (Name, Birthdate, Sex, Relationship, Contact Number, Email) */}
                <div className="grid grid-cols-[2fr_1fr_1fr_2fr_2fr] gap-2 text-xs mb-6">

                {/* Headers */}
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                    <p>Name</p>
                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                    <p>Birthdate</p>
                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                    <p>Sex</p>
                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                    <p>Relationship to the Insured</p>
                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                    <p>Contact Number/Email</p>
                </div>

                {/* Dynamic Rows */}
                {[...Array(4)].map((_, i) => (
                    <>
                        <div key={`name-${i}`} className="bg-white rounded border-2 p-2 whitespace-nowrap">
                           <p>Name</p>
                        </div>
                        <div key={`birthdate-${i}`} className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <p>Birthdate</p>
                        </div>
                        <div key={`sex-${i}`} className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <p>Sex</p>
                        </div>
                        <div key={`relationship-${i}`} className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <p>Relationship to the Insured</p>
                        </div>
                        <div key={`contact-${i}`} className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <p>Contact Number/Email</p>
                        </div>
                    </>
                ))}
                </div>

                <hr className="border-t-[46px] border-gray-400 mb-4 -mx-6" style={{ borderColor: '#919191', height: '6px' }} />

                {/* Agent Signatures */}
                <div className="flex items-start mb-6 text-sm mt-10">
                    <div className="text-center w-1/2">
                        <div className="border-t border w-3/4 mx-auto my-2"></div> {/* Line below the name */}
                        <p><strong>Insurance Agent Name and Signature</strong></p>
                        <div className="bg-white rounded border-2 text-left mt-2 p-1 mx-13">
                            <label className="text-sm">Date Signed</label>
                        </div>
                    </div>

                    {/* Logo in between signatures */}
                    <div className="flex justify-center items-center w-1/6">
                        <img src="/images/lumina.png" alt="Lumina Logo" className="h-30" />
                    </div>

                    {/* Client Signatures */}
                    <div className="text-center w-1/2">
                        <div className="border-t border w-3/4 mx-auto my-2"></div> {/* Line below the name */}
                        <p><strong>Client Name and Signature</strong></p>
                        <div className="bg-white rounded border-2 text-left mt-2 p-1 mx-13">
                            <label className="text-sm">Date Signed</label>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-medium text-justify leading-snug space-y-2 ml-4 mr-4" style={{ fontStyle: 'italic' }}>
                    <p>This application form is a formal expression of interest and does not constitute a binding insurance policy until underwriting is complete and approved. All personal data collected will be processed in accordance with the Data Privacy Act of 2012. Lumina reserves the right to request additional information and supporting documents as needed.</p>
                    <br />Need Assistance? Call (02) 1234-5678 or email: support@lumina.com.ph
                </div>

            </div>

            {/* Additional Section Outside Main Container */}
            <div className="p-6 max-w-5xl w-full mt-2 text-center text-black mx-auto">
                <p className="text-justify text-medium">
                    I, <strong>JOHN BENEDICT ONG</strong>, hereby confirm that I have thoroughly reviewed the policy application/claim and that my decision to
                </p>
                <div className="flex justify-center items-center mt-2">
                    <label className="mx-2 flex items-center">
                        <input type="radio" name="decision" value="accept" className="mr-1" />
                        <em><strong>Accept</strong></em>
                    </label>
                    <label className="mx-2 flex items-center">
                        <input type="radio" name="decision" value="reject" className="mr-1" />
                        <em><strong>Reject</strong></em>
                    </label>
                </div>
                <p className="text-justify mt-4">
                    is based on Lumina Insurances' underwriting guidelines, policy terms, and current regulatory standards.
                </p>
                <p className="mt-2 text-justify">
                    I understand that this review directly affects client service and compliance, and I affirm that all due diligence has been applied in making this decision.
                </p>
                <div className="mt-10">
                    <p className="font-bold mt-2">JOHN BENEDICT ONG</p>
                    <hr className="border-black w-1/4 mx-auto" />
                    <p className="font-bold">Writer Name and Signature</p>
                    <p>Date Signed: December 20, 2024</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="bg-[#FFC840] px-14 py-3 text-black font-bold rounded-lg shadow-md mt-8 mb-8">

                    Submit Review
                </button>
            </div>
        </div >
    );
};

export default PolicyCertificate;