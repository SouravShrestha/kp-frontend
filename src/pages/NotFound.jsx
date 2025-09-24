import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center bg-mainBg text-mainText text-center px-4 font-barlow">
      <h1 className="text-5xl md:text-6xl mb-4 font-ttjenevers">404</h1>
      <h2 className="text-lg md:text-xl mb-4">Page Not Found</h2>
      <p className="text-base md:text-lg mb-8 font-almarai">
        Sorry, the page you are looking for does not exist.
        <br />
        You can go back to the{" "}
        <Link to="/" className="underline transition-colors underline-offset-4 tracking-wide">
          homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
