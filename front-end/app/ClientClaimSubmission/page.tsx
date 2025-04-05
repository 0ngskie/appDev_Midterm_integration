"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the router

const ClaimSubmission: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState({
    fullName: "",
    policyNumber: "",
    dateOfBirth: "",
    phoneNumber: "",
    relationshipToPolicyholder: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
    amountClaimed: "",
    policyType: "" as string,
    requiredDocument: "",
    claimantName: "",
    signature: "",
    signatureDate: "",
    userId: ""
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // First try to get user ID from localStorage
    const userData = localStorage.getItem('userData');
    let userId: string | null = null;
    
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log('Setting user ID from localStorage:', parsedData.userId);
      userId = parsedData.userId;
      setFormData(prev => ({ ...prev, userId: parsedData.userId || "" }));
    } else {
      // If no user data in localStorage, use test user ID
      userId = '1'; // Replace with actual user ID
      console.log('Setting test user ID:', userId);
      setFormData(prev => ({ ...prev, userId: userId || "" }));
    }
    
    // Fetch user details from the API
    if (userId) {
      fetchUserDetails(userId);
    } else {
      console.error("User ID is null. Cannot fetch user details.");
    }
  }, []);
  
  const fetchUserDetails = async (userId: string) => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      // Make API call to get user profile data
      const response = await fetch(`http://localhost:5000/clients/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
      
      // Auto-populate form with user data
      setFormData(prev => ({
        ...prev,
        fullName: userData.full_name || '',
        dateOfBirth: userData.date_of_birth || '',
        phoneNumber: userData.contact_number || '',
        // If the user is the policyholder, set this field to "Self"
        relationshipToPolicyholder: "Self",
        // Pre-fill signature with the user's name
        signature: userData.full_name || '',
        claimantName: userData.full_name || '',
        // Also fetch user's active policies if available
        policyNumber: userData.active_policy_id || ''
      }));
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to load user details. Please fill in the form manually.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value, type } = e.target;
    
    // Map placeholders to state keys
    const inputMappings: { [key: string]: string } = {
      "Full Name": "fullName",
      "Policy Number": "policyNumber",
      "Date of Birth": "dateOfBirth", 
      "Phone Number": "phoneNumber",
      "Relationship to Policyholder": "relationshipToPolicyholder",
      "Date of Event (e.g. hospitalization, vehicle incident, retirement, etc.)": "eventDate",
      "Location of Event (if applicable)": "eventLocation",
      "Brief Description of Event or Reason for Claim": "eventDescription",
      "Total Amount Being Claimed": "amountClaimed",
      "Claimant Name": "claimantName",
      "Signature": "signature"
    };

    const stateKey = inputMappings[placeholder] || placeholder.toLowerCase().replace(/\s/g, '');
    
    setFormData(prev => ({
      ...prev,
      [stateKey]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
  };

  // Map frontend policy types to backend expected values
  const policyTypeMapping: { [key: string]: string } = {
    "Retirement Claim": "Retirement",
    "Education Claim": "Education",
    "Health Claim": "Health",
    "Auto Claim": "Auto"
  };

  const handlePolicyTypeChange = (type: string) => {
    // Now we're storing a single policy type
    setFormData(prev => ({
      ...prev,
      policyType: prev.policyType === type ? "" : type
    }));
  };

  // Backend accepts specific document types
  const validDocuments = [
    "Valid Government ID",
    "Copy of Policy Contract",
    "Official Receipts / Billing Statements",
    "Medical or Hospital Records",
    "Police Report / Incident Report",
    "Certificate of Retirement / Age Verification",
    "School Registration / Proof of Enrollment",
    "Others"
  ];

  const handleDocumentSelect = (document: string) => {
    // Now we're storing a single required document
    setFormData(prev => ({
      ...prev,
      requiredDocument: prev.requiredDocument === document ? "" : document
    }));
  };

  const validateForm = () => {
    // Basic validation before submission
    if (!formData.fullName || !formData.policyNumber || !formData.dateOfBirth || 
        !formData.phoneNumber || !formData.relationshipToPolicyholder || 
        !formData.eventDescription || !formData.userId || !formData.policyType ||
        !formData.requiredDocument) {
      return false;
    }
    
    // Ensure amount claimed is positive
    if (Number(formData.amountClaimed) <= 0) {
      alert("Amount claimed must be a positive number");
      return false;
    }
    
    // Ensure event date is not in the future
    if (new Date(formData.eventDate) > new Date()) {
      alert("Event date cannot be in the future");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill in all required fields correctly");
      return;
    }

    console.log('Form data before submission:', formData);
  
    // Map frontend values to backend expected format
    const payload = {
      claim_date: new Date().toISOString().split("T")[0],
      amount_claimed: Number(formData.amountClaimed || 0),
      status: "Under Review",
      full_name: formData.claimantName || formData.fullName,
      claimant_dob: formData.dateOfBirth,
      claimant_contact_Number: formData.phoneNumber,
      claimant_relationship: formData.relationshipToPolicyholder,
      event_date: formData.eventDate,
      event_location: formData.eventLocation || "Not Specified",
      event_description: formData.eventDescription,
      policy_type: policyTypeMapping[formData.policyType] || "Health",
      required_document: formData.requiredDocument,
      policy_id: Number(formData.policyNumber),
      client_id: Number(formData.userId),
      beneficiary_id: null, // Optional in your backend
    };

    console.log('Payload before submission:', payload);

    try {
      const response = await fetch("http://localhost:5000/claims", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Full Error Response:", errorData);
        throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      alert(`Claim submitted successfully! Claim ID: ${responseData.claim_id}`);
      
      // Redirect to the client claims and services page after successful submission
      router.push("http://localhost:3000/clientClaimsAndServices");
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Submission failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F8F8F8] p-6">
      {/* Main Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg mt-4">
        {/* Back Button */}
        <div className="w-full flex justify-end">
          <a
            href="/"
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
          Policy Claim Submission Form
        </h2>

        {isLoading ? (
          <div className="text-center p-4">
            <p className="text-black">Loading your information...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Policy Number"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                      className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                      required
                    />
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Relationship to Policyholder"
                      value={formData.relationshipToPolicyholder}
                      onChange={handleInputChange}
                      className="input bg-white border border-black-100 rounded-lg px-3 py-2 text-black"
                      required
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
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Location of Event (if applicable)"
                      value={formData.eventLocation}
                      onChange={handleInputChange}
                      className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                    />
                    <input
                      type="text"
                      placeholder="Brief Description of Event or Reason for Claim"
                      value={formData.eventDescription}
                      onChange={handleInputChange}
                      className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Total Amount Being Claimed"
                      value={formData.amountClaimed}
                      onChange={handleInputChange}
                      className="input bg-white border black-100 rounded-lg px-3 py-2 text-black"
                      required
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Policy Type */}
              <div className="mt-6">
                <h3 className="text-black font-bold mb-2">Policy Type (select one):</h3>
                <div className="flex space-x-2 text-black">
                  {["Retirement Claim", "Education Claim", "Health Claim", "Auto Claim"].map(
                    (type, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="policyType"
                          checked={formData.policyType === type}
                          onChange={() => handlePolicyTypeChange(type)}
                          required
                        />
                        <span>{type}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Supporting Documents & Declaration in Two-Column Layout */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                {/* Required Supporting Documents */}
                <div>
                  <h3 className="text-black font-bold mb-2">Required Supporting Document (select one)</h3>
                  <div className="grid grid-cols-1 gap-1 text-black">
                    {validDocuments.map((doc, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input 
                          type="radio"
                          name="requiredDocument"
                          checked={formData.requiredDocument === doc}
                          onChange={() => handleDocumentSelect(doc)}
                          required
                        />
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
                      value={formData.claimantName}
                      onChange={handleInputChange}
                      className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                      required
                    />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Signature"
                        value={formData.signature}
                        onChange={handleInputChange}
                        className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                        required
                      />
                      <input
                        type="date"
                        name="signatureDate"
                        value={formData.signatureDate}
                        onChange={(e) => {  
                          setFormData({
                            ...formData,
                            signatureDate: e.target.value,
                          });
                        }}
                        className="w-full border border-black p-1 rounded bg-gray-100 text-black text-sm outline-none"
                        required
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
                  <button 
                    type="submit"
                    className="bg-[#FFC840] px-6 py-2 text-black font-bold rounded-lg shadow-md"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ClaimSubmission;