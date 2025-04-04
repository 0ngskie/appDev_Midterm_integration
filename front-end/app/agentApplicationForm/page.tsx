"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const PolicyCertificate: React.FC = () => {
    const router = useRouter(); // Initialize the router
    const [verificationMessage, setVerificationMessage] = useState<string>("");
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        nationality: "",
        email: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const verifyUser = async () => {
        try {
            // Check if birthdate is valid before formatting
            if (!formData.birthdate) {
                setVerificationMessage("Please enter a valid birthdate");
                return;
            }

            // Format the birthdate to YYYY-MM-DD
            let formattedBirthdate;
            try {
                // Try to parse the date in various formats
                const dateParts = formData.birthdate.split('/');
                if (dateParts.length === 3) {
                    // Assume MM/DD/YYYY format
                    formattedBirthdate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
                } else {
                    // Try to parse as a standard date
                    const date = new Date(formData.birthdate);
                    if (isNaN(date.getTime())) {
                        throw new Error("Invalid date");
                    }
                    formattedBirthdate = date.toISOString().split('T')[0];
                }
            } catch {
                setVerificationMessage("Please enter a valid birthdate in MM/DD/YYYY format");
                return;
            }

            const response = await fetch('http://localhost:5000/users/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(), // Ensure no extra spaces
                    birthdate: formattedBirthdate,
                    nationality: formData.nationality,
                    email: formData.email
                })
            });

            if (response.ok) {
                setVerificationMessage("User verified successfully!");
            } else {
                const errorData = await response.json();
                setVerificationMessage(errorData.message || "User verification failed. Please check the information.");
            }
        } catch (error) {
            setVerificationMessage("Error verifying user. Please try again.");
            console.error('Error:', error);
        }
    };

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
                <h1 className="text-2xl font-bold mb-6">Lumina Official Certificate of Insurance Template</h1>
                <p><i>For Agent Use Only</i></p>
            </div>
            
            {/* Form Sheet */}
            <div className="bg-gray-100 text-black font-montserrat px-6 py-8 relative max-w-5xl mx-auto rounded border-3 border-3-gray-300 shadow-lg mt-8 mb-8">

                <div className="flex items-start">
                    <div className="flex flex-col items-start">
                        <img src="/images/lumina.png" alt="Lumina Logo" className="h-30" />
                    </div>  
                    <div className="text-right ml-auto">
                        <h1 className="text-xl font-bold">Certificate of Insurance</h1>
                        <div className="flex flex-col space-y-2 mt-2 mb-2">
                            <input type="text" placeholder="Policy Effective Date" className="bg-white rounded border-2 text-left pl-2" />
                            <input type="text" placeholder="Policy Number" className="bg-white rounded border-2 text-left pl-2" />
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
                            <input
                                type="text"
                                placeholder="Insured Name"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded border-2 p-2">
                                <input
                                    type="text"
                                    placeholder="Issue Age"
                                    className="focus:outline-none w-full"
                                    />
                            </div>
                            <div className="bg-white rounded border-2 p-2">
                                <input
                                    type="text"
                                    placeholder="Sex"
                                    className="focus:outline-none w-full"
                                    />
                            </div>
                        </div>
                        <div className="bg-white rounded border-2 p-2">
                            <input
                                type="text"
                                placeholder="Relationship to the Owner"
                                className="focus:outline-none w-full"
                            />
                        </div>
                    </div>
                </div>


                    {/* Owner Info */}
                    <div>
                        <h2 className="font-bold text-lg mb-4">Owner/Applicant Information</h2>
                        <div className="grid grid-cols-2 gap-4">

                            <div className="space-y-4">
                                <div className="bg-white rounded border-2 p-2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        className="focus:outline-none w-full"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded border-2 p-2">
                                        <input
                                            type="text"
                                            name="birthdate"
                                            value={formData.birthdate}
                                            onChange={handleInputChange}
                                            placeholder="Birthdate"
                                            className="focus:outline-none w-full"
                                        />
                                    </div>
                                    <div className="bg-white rounded border-2 p-2">
                                        <input
                                            type="text"
                                            placeholder="Birthplace"
                                            className="focus:outline-none w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded border-2 p-2">
                                        <input
                                            type="text"
                                            placeholder="Issue Age"
                                            className="focus:outline-none w-full"
                                        />
                                    </div>
                                    <div className="bg-white rounded border-2 p-2">
                                        <input
                                            type="text"
                                            placeholder="Sex"
                                            className="focus:outline-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white rounded border-2 p-2">
                                    <input
                                        type="text"
                                        placeholder="Civil Status"
                                        className="focus:outline-none w-full"
                                    />
                                </div>

                                <div className="bg-white rounded border-2 p-2">
                                    <input
                                        type="text"
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        placeholder="Nationality"
                                        className="focus:outline-none w-full"
                                    />
                                </div>

                                <div className="bg-white rounded border-2 p-2">
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="focus:outline-none w-full"
                                    />
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
                            <input
                                type="text"
                                placeholder="Street Address"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="bg-white rounded border-2 p-2">
                            <input
                                type="text"
                                placeholder="Barangay"
                                className="focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white rounded border-2 p-2">
                            <input
                                type="text"
                                placeholder="State/Province"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="bg-white rounded border-2 p-2">
                            <input
                                type="text"
                                placeholder="City Address"
                                className="focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded border-2 p-2">
                            <input
                                type="text"
                                placeholder="Zip/Postal Code"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="bg-white rounded border-2 p-2">
                            <input
                                type="text"
                                placeholder="Country"
                                className="focus:outline-none w-full"
                            />
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
                    <input
                    type="text"
                    placeholder="Name"
                    className="focus:outline-none w-full"
                    />
                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                <input
                    type="text"
                    placeholder="Birthdate"
                    className="focus:outline-none w-full"
                    />
                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                <input
                    type="text"
                    placeholder="Sex"
                    className="focus:outline-none w-full"
                    />
                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                <input
                    type="text"
                    placeholder="Relationship to the Insured"
                    className="focus:outline-none w-full"
                    />                </div>
                <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                <input
                    type="text"
                    placeholder="Contact Number/Email"
                    className="focus:outline-none w-full"
                    />
                 </div>

                {/* Dynamic Rows */}
                {[...Array(4)].map((_, i) => (
                    <React.Fragment key={`beneficiary-${i}`}>
                        <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Name"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Birthdate"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Sex"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Relationship to the Insured"
                                className="focus:outline-none w-full"
                            />
                        </div>
                        <div className="bg-white rounded border-2 p-2 whitespace-nowrap">
                            <input
                                type="text"
                                placeholder="Contact Number/Email"
                                className="focus:outline-none w-full"
                            />
                        </div>
                    </React.Fragment>
                ))}
                </div>

                <hr className="border-t-[46px] border-gray-400 mb-4 -mx-6" style={{ borderColor: '#919191', height: '6px' }} />

                {/* Agent Signatures */}
                <div className="flex items-start mb-6 text-sm mt-10">
                    <div className="text-center w-1/2">
                        <input
                        type="text"
                        placeholder="Printed Name"
                        className="ml-40 focus:outline-none w-full"
                        /> 
                        <div className="border-t border w-3/4 mx-auto my-2"></div> {/* Line below the name */}
                        <p><strong>Insurance Agent Name and Signature</strong></p>
                        <div className="bg-white rounded border-2 text-left mt-2 p-1 mx-13">
                        <input
                        type="text"
                        placeholder="Date Signed"
                        className="focus:outline-none w-full"
                        />                       
                    </div>
                    </div>

                    {/* Logo in between signatures */}
                    <div className="flex justify-center items-center w-1/6">
                        <img src="/images/lumina.png" alt="Lumina Logo" className="h-30" />
                    </div>

                    {/* Client Signatures */}
                    <div className="text-center w-1/2">
                        <input
                        type="text"
                        placeholder="Printed Name"
                        className="ml-40 focus:outline-none w-full"
                        /> 
                        <div className="border-t border w-3/4 mx-auto my-2"></div> {/* Line below the name */}
                        <p><strong>Client Name and Signature</strong></p>
                        <div className="bg-white rounded border-2 text-left mt-2 p-1 mx-13">
                        <input
                        type="text"
                        placeholder="Date Signed"
                        className="focus:outline-none w-full"
                        /> 
                   </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-medium text-justify leading-snug space-y-2 ml-4 mr-4" style={{ fontStyle: 'italic' }}>
                    <p>This application form is a formal expression of interest and does not constitute a binding insurance policy until underwriting is complete and approved. All personal data collected will be processed in accordance with the Data Privacy Act of 2012.</p>
                    <br />Need Assistance? Call (02) 1234-5678 or email: support@lumina.com.ph
                </div>

                {/* Add verification message and submit button */}
                <div className="mt-6 text-center">
                    {verificationMessage && (
                        <div className={`mb-4 p-3 rounded ${
                            verificationMessage.includes("successfully") 
                                ? "bg-green-100 text-green-700" 
                                : "bg-red-100 text-red-700"
                        }`}>
                            {verificationMessage}
                        </div>
                    )}
                    <button
                        onClick={verifyUser}
                        className="bg-[#FFC840] text-black py-3 px-10 rounded-lg text-sm font-bold shadow-none hover:shadow-inner transition-shadow duration-300"
                    >
                        Submit to Writer
                    </button>
                </div>
            </div>
        </div >
    );
};

export default PolicyCertificate;