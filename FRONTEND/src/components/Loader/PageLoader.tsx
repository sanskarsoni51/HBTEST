import React, { useState, useEffect } from "react";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-[200px]">
          <div className="relative">
            {/* The Fixed Image */}
            <img
              src="/LogoTHB.png" // Replace with your photo path
              alt="Loader Photo"
              className="w-36 h-36 rounded-full"
            />
            {/* Rotating Circle */}
            <div
              className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-b-transparent border-gray-300 rounded-full animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          {/* Content after loader */}
          <h1>Content Loaded!</h1>
        </div>
      )}
    </>
  );
};

export default PageLoader;
