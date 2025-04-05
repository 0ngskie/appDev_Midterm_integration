"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function WriterReviewClaim() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  interface Claim {
    full_name?: string;
    policy_id?: string;
    claimant_dob?: string;
    claimant_contact_Number?: string;
    claimant_relationship?: string;
    event_date?: string;
    event_location?: string;
    event_description?: string;
    amount_claimed?: number;
    policy_type?: string;
    required_document?: string;
    claim_date?: string;
    status?: string;
  }

  const [claim, setClaim] = useState<Claim | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewDecision, setReviewDecision] = useState<"accepted" | "rejected" | "under review" | null>(null);
  const [error, setError] = useState("");
  
  // Fetch claim data based on claim ID
  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("No claim ID provided");
      return;
    }
    
    setIsLoading(true);
    console.log(`Fetching claim with ID: ${id}`); // Debug log
    
    fetch(`http://localhost:5000/claims/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch claim data: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Debug log
        
        if (data.data) {
          setClaim(data.data);
        } else if (data) {
          // Some APIs don't nest response in a "data" property
          setClaim(data);
        } else {
          throw new Error("No claim data found in response");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching claim:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleDecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewDecision(e.target.value as "accepted" | "rejected" | "under review");
  };

  const handleSubmitReview = () => {
    // Use the ID from the URL as the most reliable source
    const claimId = id;
    
    if (!claimId) {
      alert("Error: No claim ID found");
      return;
    }
  
    if (!reviewDecision) {
      alert("Please select a decision before submitting");
      return;
    }
    
    // Fix the status mapping to match exactly what the backend expects
    const statusMapping = {
      "accepted": "Accepted",
      "rejected": "Rejected",
      "under review": "Under Review",  // Corrected spelling
    };
    
    const backendStatus = statusMapping[reviewDecision];
    const apiEndpoint = `http://localhost:5000/claims/${claimId}`;
    
    console.log(`Sending PUT request to: ${apiEndpoint}`);
    console.log("With status:", backendStatus);
    
    // Add debug info to help diagnose the issue
    fetch(apiEndpoint, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: backendStatus
      }),
    })
    .then(response => {
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        return response.text().then(text => {
          console.error("Error response:", text);
          throw new Error(`Failed to update claim status (${response.status})`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Success response:", data);
      alert(`Claim review submitted successfully. Status updated to: ${backendStatus}`);
      
      // Instead of redirecting, reload the current page to see the updated status
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating claim:', error);
      alert(`Failed to update claim status: ${error.message}`);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F8F8F8] p-6">
      {/* Main Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg mt-4 w-full max-w-4xl">
        {/* Back Button */}
        <div className="w-full flex justify-end">
          <a
            href="/writerReviewClaims"
            className="bg-[#FFC840] px-4 py-2 text-black font-bold rounded-lg shadow-md"
          >
            Back
          </a>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/images/lumina.png" alt="Lumina Logo" className="h-45" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          Review Policy Claim
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading claim data...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : claim ? (
          <p className="text-black text-center pb-10">
            Claimant Name: {claim.full_name || "Not specified"}
            <br />
            Status: {claim.status || "Not specified"}
            <br />
            Claim ID: {id || "Not specified"}
          </p>
        ) : (
          <p className="text-center text-red-500">No claim data found. Please check the claim ID.</p>
        )}

        {claim && (
          <div className="bg-[#FFC840] p-6 rounded-lg shadow-md">
            {/* Form Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Claimant Information */}
              <div>
                <h3 className="text-black font-bold mb-2">Claimant Information</h3>
                <div className="grid gap-2">
                  <input
                    type="text"
                    value={claim.full_name || ""}
                    placeholder="Full Name"
                    className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                    readOnly
                  />
                  <input
                    type="text"
                    value={claim.policy_id || ""}
                    placeholder="Policy Number"
                    className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                    readOnly
                  />
                  <input
                   type="date"
                   value={claim.claimant_dob ? claim.claimant_dob.substring(0, 10) : ""}
                   placeholder="Date of Birth"
                   className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                   readOnly
                  />
                  <input
                    type="text"
                    value={claim.claimant_contact_Number || ""}
                    placeholder="Phone Number"
                    className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                    readOnly
                  />
                  <input
                    type="text"
                    value={claim.claimant_relationship || ""}
                    placeholder="Relationship to Policyholder"
                    className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                    readOnly
                  />
                </div>
              </div>

              {/* Claim Details */}
              <div>
                <h3 className="text-black font-bold mb-2">Claim Details</h3>
                <div className="grid gap-2">
                <input
                  type="date"
                  value={claim.event_date ? new Date(claim.event_date).toISOString().split('T')[0] : ""}
                  placeholder="Date of Event"
                  className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                  readOnly
                />
                  <input
                    type="text"
                    value={claim.event_location || ""}
                    placeholder="Location of Event (if applicable)"
                    className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                    readOnly
                  />
                  <input
                    type="text"
                    value={claim.event_description || ""}
                    placeholder="Brief Description of Event or Reason for Claim"
                    className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                    readOnly
                  />
                  <input
                    type="text"
                    value={claim.amount_claimed ? `${claim.amount_claimed}` : ""}
                    placeholder="Total Amount Being Claimed"
                    className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Policy Type */}
            <div className="mt-6">
              <h3 className="text-black font-bold mb-2">Policy Type:</h3>
              <div className="flex flex-wrap gap-4 text-black">
                {["Retirement", "Education", "Health", "Auto"].map(
                  (type, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={claim.policy_type === type}
                        readOnly 
                      />
                      <span>{type} Claim</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Supporting Documents & Declaration in Two-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Required Supporting Documents */}
              <div>
                <h3 className="text-black font-bold mb-2">Required Supporting Document</h3>
                <div className="grid grid-cols-1 gap-1 text-black">
                  {[
                    "Valid Government ID",
                    "Copy of Policy Contract",
                    "Official Receipts / Billing Statements",
                    "Medical or Hospital Records",
                    "Police Report / Incident Report",
                    "Certificate of Retirement / Age Verification",
                    "School Registration / Proof of Enrollment",
                    "Others"
                  ].map((doc, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={claim.required_document === doc}
                        readOnly 
                      />
                      <span>{doc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Declaration & Signature */}
              <div className="bg-white p-4 rounded-lg shadow-md">
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
                    value={claim.full_name || ""}
                    placeholder="Claimant Name"
                    className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                    readOnly
                  />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input
                      type="text"
                      value={claim.full_name || ""}
                      placeholder="Signature"
                      className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                      readOnly
                    />
                    <input
                      type="date"
                      value={claim.claim_date ? new Date(claim.claim_date).toISOString().split('T')[0] : ""}
                      className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer & Submit Button */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-center">
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
                <a href="https://www.luminainsurances.com" className="underline">
                  www.luminainsurances.com
                </a>{" "}
                for status updates.
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Writer's Review Section */}
      {!isLoading && !error && claim && (
        <div className="p-6 max-w-5xl w-full mt-6 text-center text-black bg-white rounded-lg shadow-lg">
          <p className="text-justify">
            I, <strong>JOHN BENEDICT ONG</strong>, hereby confirm that I have thoroughly reviewed the policy application/claim and that my decision to
          </p>
          <div className="flex justify-center items-center mt-2">
            <label className="mx-2 flex items-center">
              <input 
                type="radio" 
                name="decision" 
                value="accepted" 
                checked={reviewDecision === "accepted"}
                onChange={handleDecisionChange}
                className="mr-1" 
              />
              <em>Accept</em>
            </label>
            <label className="mx-2 flex items-center">
              <input 
                type="radio" 
                name="decision" 
                value="rejected" 
                checked={reviewDecision === "rejected"}
                onChange={handleDecisionChange}
                className="mr-1" 
              />
              <em>Reject</em>
            </label>
            <label className="mx-2 flex items-center">
              <input 
                type="radio" 
                name="decision" 
                value="under review" 
                checked={reviewDecision === "under review"}
                onChange={handleDecisionChange}
                className="mr-1" 
              />
              <em>Under Review</em>
            </label>
          </div>
          <p className="text-justify mt-4">
            is based on Lumina Insurances' underwriting guidelines, policy terms, and current regulatory standards.
          </p>
          <p className="mt-6 text-justify">
            I understand that this review directly affects client service and compliance, and I affirm that all due diligence has been applied in making this decision.
          </p>
          <div className="mt-10">
            <p className="font-bold mt-2">JOHN BENEDICT ONG</p>
            <hr className="border-black w-1/4 mx-auto" />
            <p className="font-bold">Writer Name and Signature</p>
            <p>Date Signed: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long", 
              day: "numeric"
            })}</p>
          </div>
          <button 
            className="bg-[#FFC840] px-6 py-2 text-black font-bold rounded-lg shadow-md mt-8"
            onClick={handleSubmitReview}
          >
            Submit Review
          </button> 
        </div>
      )}
    </div>
  );
}