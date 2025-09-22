import React, { useEffect } from "react";

const PricingMain = () =>{
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ede7df] py-16">
      <h1 className="text-4xl font-meysha mb-8 text-mainText">Our Pricing</h1>
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-barlow mb-4">Wedding Packages</h2>
        <ul className="list-disc pl-6 mb-6 text-mainText font-barlow">
          <li>Basic: $1000 - 4 hours coverage, 100 edited photos</li>
          <li>Standard: $1800 - 8 hours coverage, 250 edited photos, album</li>
          <li>
            Premium: $2500 - Full day, 400+ edited photos, album, pre-wedding
            shoot
          </li>
        </ul>
        <h2 className="text-2xl font-barlow mb-4">Other Services</h2>
        <ul className="list-disc pl-6 text-mainText font-barlow">
          <li>Engagement: $500</li>
          <li>Baby/Maternity: $400</li>
          <li>Events: $300+</li>
        </ul>
        <p className="mt-8 text-sm text-gray-600">
          Contact us for a custom quote or more details!
        </p>
      </div>
    </div>
  );
}

export default PricingMain;
