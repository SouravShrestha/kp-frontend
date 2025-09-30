import PropTypes from "prop-types";
import "../../assets/styles/index.css";
import ImagePlaceholder from "../../components/ImagePlaceholder";

const MenuCard = ({ pkg, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative h-32 sm:h-28 md:h-36 cursor-pointer transition-all duration-300 overflow-hidden border-1.5 p-1 ${
        isActive
          ? "border-borderColor transform scale-105"
          : "border-transparent"
      }`}
    >
      {/* Background placeholder - lowest layer */}
      <div className="absolute inset-0 flex flex-col justify-end items-center p-2 sm:p-3 m-1 z-0 mb-5">
        <ImagePlaceholder width={5} height={5}/>
      </div>
      
      {/* Image - middle layer */}
      {pkg.image && (
        <img
          src={pkg.image}
          alt={pkg.name}
          className="absolute inset-0 w-full h-full object-cover z-10 p-1"
        />
      )}
      
      {/* Text overlay with background - top layer */}
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-end items-center p-2 sm:p-3 m-1 z-20">
        <h3 className="font-almarai tracking-wide text-[0.85rem] md:text-[1.05rem] text-white">
          {pkg.name}
        </h3>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  pkg: PropTypes.shape({
    name: PropTypes.string.isRequired,
    idealFor: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuCard;
