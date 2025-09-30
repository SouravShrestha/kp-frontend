import imagePlaceholder from "../assets/icons/image_placeholder.png";

const ImagePlaceholder = ({ icon = imagePlaceholder, title, width, height }) => {
  const imageClasses = width && height 
    ? `w-${width} h-${height}` 
    : "w-6 h-6 md:h-7 md:w-7";

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={icon}
          alt="Loading placeholder"
          className={imageClasses}
        />
        {title && (
          <p className="text-[#999] font-almarai text-xs tracking-wide">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImagePlaceholder;