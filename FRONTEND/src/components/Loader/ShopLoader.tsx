"use client";
import React, { useState, useEffect } from "react";

const PageLoader = () => {
  const [loading, setLoading] = useState(true); // State to manage loader visibility

  useEffect(() => {
    // Set a timeout for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after 3 seconds
    }, 3000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-pale">
          <div className="relative">
            {/* The Fixed Image */}
            <img
              src="/LogoTHB.png" // Replace with the path to your photo
              alt="Loader Photo"
              className="w-60 h-60 rounded-full"
            />

            {/* The Rotating Circle */}
            <div
              className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-b-transparent border-gray-300 rounded-full animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
          </div>
        </div>
      ) : (
        <div>{/* Content to display after the loader */}</div>
      )}
    </>
  );
};

export default PageLoader;
