import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SubfolderCard = ({ sf, images, reverse = false }) => {
  const navigate = useNavigate();
  const [isReverse, setIsReverse] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : reverse));
  useEffect(() => {
    const handleResize = () => {
      setIsReverse(window.innerWidth < 768 ? true : reverse);
    };
    window.addEventListener('resize', handleResize);
    // Set on mount
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [reverse]);
  const cover = images.find(img => img.cloudinary_display_name?.startsWith("cover"));
  const others = images.filter(img => !img.cloudinary_display_name?.startsWith("cover")).slice(0, 4);
  const handleVisitGallery = () => {
    const b64Path = btoa(encodeURIComponent(sf.id));
    navigate(`/gallery/${b64Path}`);
  };

  let eventDateStr = "";
  if (sf.event_date) {
    const match = sf.event_date.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (match) {
      const [, day, month, year] = match;
      const dateObj = new Date(`${year}-${month}-${day}`);
      eventDateStr = dateObj.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else {
      eventDateStr = new Date(sf.event_date).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    }
  }

  // Responsive grid areas
  const gridTemplateAreas = !isReverse
    ? `
      'cover cover o1 o2'
      'cover cover o3 o4'
    `
    : `
      'o1 o2 cover cover'
      'o3 o4 cover cover'
    `;
  const gridTemplateAreasMobile = `
    'cover cover'
    'cover cover'
    'o1 o2'
    'o3 o4'
  `;
  const areaNames = ['o1', 'o2', 'o3', 'o4'];

  return (
    <div
      className="flex flex-col md:flex-row w-full hover:cursor-pointer relative group -mt-4"
      onClick={handleVisitGallery}
    >
      {isReverse && (
        <div className="flex flex-col items-center justify-center w-full h-20 md:w-28 transition-all duration-300 md:h-[518px] bg-[#e1ddd4]/80">
          <div className="transform md:-rotate-90 flex flex-col items-center justify-center w-[518px] h-10">
            <span className="md:group-hover:border-mainText border-b border-transparent transition-all duration-300 text-lg md:text-xl text-mainText font-barlow tracking-widest uppercase">
              {sf.event_name}
            </span>
            <span className="text-base text-mainText mt-1 md:mt-2">
              {eventDateStr}
            </span>
          </div>
        </div>
      )}
      <div className="relative w-full">
        {/* Black overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none z-10" />
        <div
          className="w-full gap-1.5 grid relative z-0"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gridTemplateAreas: gridTemplateAreasMobile,
            minHeight: "30rem",
            ...(window.innerWidth >= 768
              ? {
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(2, 1fr)",
                  gridTemplateAreas,
                }
              : {}),
          }}
        >
          {others.map((img, idx) => (
            <img
              key={idx}
              src={img.cloudinary_image_url}
              alt={`other-${idx + 1}`}
              className="w-full h-[256px] object-cover"
              style={{ gridArea: areaNames[idx] }}
            />
          ))}
          {cover && (
            <img
              src={cover.cloudinary_image_url}
              alt="cover"
              className="w-full h-[518px] object-cover"
              style={{ gridArea: "cover" }}
            />
          )}
        </div>
      </div>
      {!isReverse && (
        <div className="flex flex-col items-center justify-center w-full h-20 md:w-28 transition-all duration-300 md:h-[518px] bg-[#e1ddd4]/80">
          <div className="transform md:rotate-90 flex flex-col items-center justify-center w-[518px] h-10">
            <span className="transition-all duration-300 text-lg md:text-xl text-mainText font-barlow tracking-widest uppercase md:group-hover:border-mainText border-b border-transparent">
              {sf.event_name}
            </span>
            <span className="text-base text-mainText mt-1 md:mt-2">
              {eventDateStr}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubfolderCard;
