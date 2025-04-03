"use client";

import Link from "next/link";
import React, { useState } from "react";

const ClaimSubmission: React.FC = () => {
  const [policyType, setPolicyType] = useState("");
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F8F8F8] p-6">
      {/* Main Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg mt-4">
        {/* Back Button */}
        <div className="w-full flex justify-end">
          <Link
            href="/clientClaimsAndServices"
            className="bg-[#FFC840] px-4 py-2 text-black font-bold rounded-lg shadow-md"
          >
            Back
          </Link>
        </div>  

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/images/lumina.png" alt="Lumina Logo" className="h-45" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          Policy Claim Submission Form
        </h2>

        <div className="bg-[#FFC840] p-6 rounded-lg shadow-md">
          {/* Form Sections Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Claimant Information */}
            <div>
              <h3 className="text-black font-bold mb-2">Claimant Information</h3>
              <div className="grid gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                />
                <input
                  type="number"
                  placeholder="Policy Number"
                  className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                />
                <input
                  type="text"
                  placeholder="Relationship to Policyholder"
                  className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                />
              </div>
            </div>

            {/* Claim Details */}
            <div>
              <h3 className="text-black font-bold mb-2">Claim Details</h3>
              <div className="grid gap-2">
                <input
                  type="date"
                  placeholder="Date of Event (e.g. hospitalization, vehicle incident, retirement, etc.)"
                  className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                />
                <input
                  type="text"
                  placeholder="Location of Event (if applicable)"
                  className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                />
                <input
                  type="text"
                  placeholder="Brief Description of Event or Reason for Claim"
                  className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                />
                <input
                  type="text"
                  placeholder="Total Amount Being Claimed"
                  className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                />
              </div>
            </div>
          </div>

          {/* Policy Type */}
          <div className="mt-6">
            <h3 className="text-black font-bold mb-2">Policy Type:</h3>
            <div className="flex space-x-2 text-black">
              {["Retirement Claim", "Education Claim", "Health Claim", "Auto Claim"].map(
                (type, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="policyType"
                      value={type}
                      checked={policyType === type}
                      onChange={(e) => setPolicyType(e.target.value)}
                    />
                    <span>{type}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Supporting Documents & Declaration in Two-Column Layout */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Required Documents */}
            <div>
              <h3 className="text-black font-bold mb-2">Required Documents</h3>
              <div className="grid grid-cols-1 gap-1 text-black">
                {[
                  "Valid Government ID",
                  "Copy of Policy Contract",
                ].map((doc, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Supporting Documents & Declaration in Two-Column Layout */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Supporting Documents */}
            <div>
              <h3 className="text-black font-bold mb-2">Supporting Documents</h3>
              <div className="grid grid-cols-1 gap-1 text-black">
                {[
                  "Official Receipts / Billing Statements",
                  "Medical or Hospital Records",
                  "Police Report / Incident Report",
                  "Certificate of Retirement / Age Verification",
                  "School Registration / Proof of Enrollment",
                  "Death Certificate",
                  "Others_______________________",
                ].map((doc, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Declaration & Signature */}
            <div className="bg-white p-4 h-55 mt-1 rounded-lg shadow-md">
              <h3 className="text-black font-bold mb-2">Declaration & Signature</h3>
              <p className="text-sm text-black">
                I, the undersigned, hereby declare that the above information is true and
                correct to the best of my knowledge. I understand that Lumina Insurances
                reserves the right to verify any information provided and may request further
                documentation if necessary.
              </p>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Claimant Name"
                  className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Signature"
                    className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                  />
                  <input
                    type="date"
                    className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer & Submit Button */}
          <div className="mt-0 bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-black text-xs text-justify">
              All claims are subject to review and approval by Lumina Insurances' Claims
              Department. Submission does not guarantee approval. Processing time may vary
              depending on claim type and completeness of documentation.
            </p>

            {/* Need Help Section */}
            <div className="mt-4 text-left text-sm text-black">
              Need Help? Call (02) 1234-5678 or email claims@lumina.com.ph
            </div>

            <div className="mt-2 text-left text-sm text-black">
              Visit{" "}
              <a href="www.luminainsurances.com" className="underline">
                www.luminainsurances.com
              </a>{" "}
              for status updates.
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/clientClaimsAndServices">
                <button className="bg-[#FFC840] px-6 py-2 text-black font-bold rounded-lg shadow-md">
                  Submit Request
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ClaimSubmission;