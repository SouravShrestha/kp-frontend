import React, { useEffect } from "react";

const AboutMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ede7df] py-16">
      <h1 className="text-4xl font-meysha mb-8 text-mainText">About Page</h1>
      <p className="text-mainText font-barlow">
        This is a placeholder for the About page.
      </p>
    </div>
  );
};
export default AboutMain;
