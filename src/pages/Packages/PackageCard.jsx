import PropTypes from "prop-types";
import "../../assets/styles/index.css";
import arrowIcon from "../../assets/icons/arrow.svg";
import { getIcon } from "../../utils/iconMapping";
import { useNavigate } from "react-router-dom";
import { usePagePreloaderContext } from "../../contexts/PagePreloaderContext";
import { createPageNavigationHandler } from "../../utils/navigationUtils";
import ImagePlaceholder from "../../components/ImagePlaceholder";

const PackageCard = ({ pkg }) => {
  const navigate = useNavigate();
  const { preloadPageData } = usePagePreloaderContext();
  
  const handlePageNavigation = createPageNavigationHandler(preloadPageData, navigate);
  return (
    <div className="w-full">
      <div className="bg-[#ede7df] overflow-hidden">
        <div className="relative">
          {/* Placeholder - lowest layer */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-colorSecondary">
            <ImagePlaceholder />
          </div>
          
          {pkg.image && (
            <img
              src={pkg.image}
              alt={pkg.name}
              className="relative w-full h-60 sm:h-72 md:h-[30rem] object-cover z-20"
            />
          )}
          
          {/* Backdrop/gradient overlay - middle layer */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4 sm:px-10 sm:py-6 z-30">
            <h2 className="text-2xl sm:text-3xl font-meysha text-white mb-2">
              {pkg.name}
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-almarai">
              {pkg.ideal_for}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-12">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex items-end">
              <span className="text-5xl font-barlow text-mainText tracking-wide">
                ${pkg.price_aud}
              </span>
              <span className="text-lg font-almarai text-mainText ml-2">
                {" "}
                per session
              </span>
            </div>
            <a 
              href={`/contact?package=${encodeURIComponent(pkg.name)}`}
              onClick={(e) => handlePageNavigation(e, `/contact?package=${encodeURIComponent(pkg.name)}`, "contact")}
              className="w-full  bg-white sm:w-auto border-1.5 border-borderColor px-6 py-2 hover:bg-gray-50 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-mainText font-barlow tracking-wide text-lg uppercase">Book YOUR session now</span>
              <img src={arrowIcon} alt="Arrow" className="w-8 h-8" />
            </a>
          </div>
          <div className="mt-6 md:mt-8">
            <h3 className="text-xl font-barlow tracking-wide text-mainText mb-4">
              What's included:
            </h3>
            <ul className="space-y-2 md:grid md:grid-cols-2 md:gap-x-6 md:w-2/3 md:gap-y-2 md:space-y-0">
              {pkg.includes.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-mainText mr-2 mt-1">
                    {getIcon(feature.icon) && (
                      <img 
                        src={getIcon(feature.icon)} 
                        alt={feature.icon} 
                        className="w-4 h-4" 
                      />
                    )}
                  </span>
                  <span className="text-mainText font-almarai ml-1">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  pkg: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    ideal_for: PropTypes.string.isRequired,
    includes: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    price_aud: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default PackageCard;
