
import { useEffect, useState, useRef } from "react";
import { ContentAPI } from "../../apis";
import PackageCard from "./PackageCard";
import MenuCard from "./MenuCard";
import arrowIcon from "../../assets/icons/arrow.svg";
import starIcon from "../../assets/icons/star.png";
import { Link } from "react-router-dom";

const PackageMain = () => {
  const [packages, setPackages] = useState([]);
  const [activePackage, setActivePackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const topMenuRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setIsLoading(true);
      const data = await ContentAPI.fetchPackages();
      if (data && data.length > 0) {
        setPackages(data);
        setActivePackage(data[0]);
      } else {
        setPackages([]);
        setActivePackage(null);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading packages:', err);
      setError('Failed to load packages. Please try again later.');
      setPackages([]);
      setActivePackage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTopMenu = () => {
    if (topMenuRef.current) {
      topMenuRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-mainBg py-8 sm:py-12 lg:py-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-meysha text-mainText mb-6 md:mb-12 leading-relaxed">
          Capture Your Story, Beautifully
        </h1>
        <p className="text-base sm:text-lg text-mainText font-almarai max-w-3xl mx-auto leading-7">
          We get it, life's moments are precious. That's why we've designed
          flexible photography packages for every occasion. All delivered
          digitally, beautifully edited, and ready to cherish forever.
        </p>
        <p className="text-base sm:text-lg text-mainText font-almarai mt-4">
          For custom quotes and add-ons contact us{" "}
          <Link
            to="/contact"
            className="text-mainText hover:text-mainText underline underline-offset-2 transition-colors duration-200"
          >
            here
          </Link>
        </p>
      </div>

      <div className="-auto px-5 md:px-32">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainText mx-auto mb-4"></div>
              <p className="font-almarai text-mainText">Loading packages...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="font-almarai text-red-600 mb-4">{error}</p>
            <button
              onClick={loadPackages}
              className="px-6 py-2 bg-mainText text-mainBg font-almarai tracking-wide uppercase text-sm hover:opacity-80 transition-opacity duration-300"
            >
              Try Again
            </button>
          </div>
        ) : !packages || packages.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-almarai text-mainText">No packages available at the moment.</p>
          </div>
        ) : (
          <>
            {/* Top Menu - Package List */}
            <div
              ref={topMenuRef}
              className="sm:mb-8 items-center flex justify-center pt-9 md:pt-14"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-3 sm:gap-x-4 mb-8">
                {packages.map((pkg) => (
              <MenuCard
                key={pkg.id || pkg.name}
                pkg={pkg}
                isActive={activePackage && activePackage.name === pkg.name}
                onClick={() => {
                  setActivePackage(pkg);
                  scrollToTopMenu();
                }}
              />
            ))}
          </div>
        </div>

            {/* Navigation Buttons */}
            {activePackage && (
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => {
                    const currentIndex = packages.findIndex(
                      (pkg) => pkg.name === activePackage.name
                    );
                    const prevIndex =
                      currentIndex > 0 ? currentIndex - 1 : packages.length - 1;
                    setActivePackage(packages[prevIndex]);
                  }}
                  className="flex items-center justify-center h-12 w-12"
                >
                  <img
                    src={arrowIcon}
                    alt="Previous"
                    className=" w-10 h-10 transform rotate-180"
                  />
                </button>

                <div className="text-center">
                  <div className="text-lg text-mainText tracking-wide font-barlow md:text-2xl">
                    {activePackage.name}
                  </div>
                  <div className="text-sm font-almarai md:text-base md:mt-1">
                    {activePackage.ideal_for}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const currentIndex = packages.findIndex(
                      (pkg) => pkg.name === activePackage.name
                    );
                    const nextIndex =
                      currentIndex < packages.length - 1 ? currentIndex + 1 : 0;
                    setActivePackage(packages[nextIndex]);
                  }}
                  className="flex items-center justify-center w-12 h-12"
                >
                  <img
                    src={arrowIcon}
                    alt="Previous"
                    className=" w-10 h-10 transform"
                  />
                </button>
              </div>
            )}

            {/* Package Details */}
            {activePackage && <PackageCard pkg={activePackage} />}

            <div className="flex justify-end items-center mt-8">
              <img src={starIcon} alt="Star" className="h-3 w-3 m mr-2" />
              <p className="text-sm sm:text-base text-mainText font-almarai">
                For custom quotes and add-ons contact us{" "}
                <Link
                  to="/contact"
                  className="text-mainText hover:text-mainText underline underline-offset-2 transition-colors duration-200"
                >
                  here
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageMain;
