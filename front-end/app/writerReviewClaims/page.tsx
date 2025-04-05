"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function ReviewPolicyClaims() {
  const router = useRouter();
  interface Claim {
    id: string;
    full_name?: string;
    name?: string;
    policy_type?: string;
    type?: string;
    claim_date?: string;
    date?: string;
    status?: string;
  }

  const [claims, setClaims] = useState<Claim[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  // Fetch claims from the backend with pagination
  useEffect(() => {
    fetch(`http://localhost:5000/claims?page=${pagination.page}&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setClaims(data.data);
          setPagination((prev) => ({
            ...prev,
            totalPages: data.pagination.totalPages,
          }));
        }
      })
      .catch((error) => console.error("Error fetching claims:", error));
  }, [pagination.page]);

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  const handleReviewClick = (claimId: string) => {
    // Navigate to the writerReviewClaim page with the claim ID as a query parameter
    router.push(`/writerReviewClaim?id=${claimId}`);
  };

  return (
    <div className="text-black mt-30 min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <img src="/images/lumina.png" alt="Lumina Logo" width="80" height="80" />
          </div>
          <div className="flex space-x-2">
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">About Lumina</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Policies</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Claim and Services</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Review Policy Requests</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold">Review Claims</button>
            <button className="bg-[#FFC840] text-black py-1 px-2 rounded-lg text-[12px] font-montserrat font-bold flex items-center space-x-2">
              <span>MY PROFILE</span>
              <button className="bg-white text-black py-1 px-2 rounded-full text-[12px] font-montserrat font-bold flex items-center space-x-1">
                <span>Logout</span>
              </button>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6">Review Policy Claims</h1>

        <div className="border border-[#FFC840] rounded-lg p-6 max-w-4xl mx-auto mb-6">
          {claims.length > 0 ? (
            claims.map((claim, index) => (
              <div key={index} className="flex items-center mb-4 gap-4">
                <button 
                  className="bg-[#FFC840] px-4 py-1 rounded-full text-black font-medium min-w-[80px] text-center"
                  onClick={() => handleReviewClick(claim.id)}
                >
                  Review
                </button>
                <div className="flex-grow">
                  <span className="font-medium">ID: {claim.id}</span>
                  <span className="mx-2">•</span>
                  <span className="font-medium">{claim.full_name || claim.name}</span>
                  <span className="mx-2">•</span>
                  <span className="font-medium">{claim.policy_type || claim.type}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">Date: {claim.claim_date || claim.date}</span>
                </div>
                <div className="text-sm">Status: {claim.status}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading claims...</p>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            className="bg-[#FFC840] px-6 py-2 rounded-full text-black font-medium"
            disabled={pagination.page === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-[#FFC840] px-6 py-2 rounded-full text-black font-medium"
            disabled={pagination.page === pagination.totalPages}
          >
            Next
          </button>
        </div>
      </main>

      <footer className="bg-[#FFC840] text-black py-4 mt-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col items-start">
            <div className="flex space-x-2">
              <p className="font-montserrat text-xs">Copyright 2025 Lumina Insurances. All rights reserved.</p>
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
}