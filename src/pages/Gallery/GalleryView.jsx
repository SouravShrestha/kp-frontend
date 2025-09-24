import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import arrowIcon from "../../assets/icons/arrow.svg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MediaAPI, FolderAPI } from "../../apis";
import { formatEventDate } from "../../utils/dateUtils";

const GalleryView = () => {
  const { folderId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [eventInfo, setEventInfo] = useState({
    event_name: "",
    event_date: "",
  });

  useEffect(() => {
    if (!folderId) {
      setImages([]);
      setEventInfo({ event_name: "", event_date: "" });
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        var decondedFolderId = decodeURIComponent(atob(folderId));
        const imgs = await MediaAPI.fetchImagesByFolderId(decondedFolderId);
        setImages(imgs);
        let event_name = "";
        let event_date = "";
        if (decondedFolderId) {
          const folder = await FolderAPI.getFolderById(decondedFolderId);
          if (folder) {
            event_name = folder.event_name || folder.name || "";
            event_date = folder.event_date || folder.date || "";
          }
        }
        setEventInfo({ event_name, event_date });
      } catch (e) {
        setImages([]);
        setEventInfo({ event_name: "", event_date: "" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let eventDateStr = formatEventDate(eventInfo.event_date);

  return (
    <div className="flex flex-col min-h-screen bg-mainBg pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between md:px-8 md:py-6 md:min-h-64">
        <Link
          to="/gallery"
          className="flex items-center gap-2 md:border-r pr-20 border-borderColor hover:underline py-10"
        >
          <img src={arrowIcon} alt="Back" className="w-8 h-4 rotate-180" />
          <span className="font-ttjenevers text-base tracking-wide ml-4 uppercase">
            Back to all galleries
          </span>
        </Link>
        <div className="flex-1 flex flex-col items-center md:py-8 mt-4 px-8">
          <span className="font-meysha font-medium text-4xl md:text-5xl text-center">
            {eventInfo.event_name}
          </span>
          <span className="text-base mt-4 font-almarai tracking-wide mb-10">
            {eventDateStr}
          </span>
        </div>
        <div className="w-40" /> {/* Spacer for symmetry */}
      </div>
      {/* Masonry Gallery */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 900: 2, 1400: 3, 1800: 4 }}
      >
        <Masonry gutter="8px">
          {images.map((img, idx) => 
            img.cloudinary_image_url ? (
              <img
                key={idx}
                src={img.cloudinary_image_url}
                alt={img.displayname || `gallery-img-${idx}`}
                style={{
                  width: "100%",
                  display: "block",
                }}
              />
            ) : null
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default GalleryView;
