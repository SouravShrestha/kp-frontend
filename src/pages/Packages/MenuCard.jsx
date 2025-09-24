import React from "react";
import PropTypes from "prop-types";
import "../../assets/styles/index.css";

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
      {pkg.image && (
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-center p-2 sm:p-3 m-1">
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
