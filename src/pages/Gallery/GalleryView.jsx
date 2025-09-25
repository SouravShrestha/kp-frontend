import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { usePagePreloaderContext } from "../../contexts/PagePreloaderContext";
import { createPageNavigationHandler } from "../../utils/navigationUtils";
import arrowIcon from "../../assets/icons/arrow.svg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { formatEventDate } from "../../utils/dateUtils";
import { fetchGalleryViewData, decodeFolderId } from "../../services/galleryViewService";

const GalleryView = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { preloadPageData, getPreloadedData } = usePagePreloaderContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handlePageNavigation = createPageNavigationHandler(preloadPageData, navigate);

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
    
    // Check if we have event info passed through navigation state
    const passedEventInfo = location.state;
    
    setLoading(true);
    
    // First, try to get preloaded data
    const preloadedData = getPreloadedData("gallery-view", { folderId });
    
    if (preloadedData) {
      // Use preloaded data
      setImages(preloadedData.images || []);
      setEventInfo(preloadedData.eventInfo || { event_name: "", event_date: "" });
      setLoading(false);
    } else {
      // Fall back to fetching data
      if (passedEventInfo && passedEventInfo.eventName && passedEventInfo.eventDate) {
        setEventInfo({
          event_name: passedEventInfo.eventName,
          event_date: passedEventInfo.eventDate
        });
      }
      
      const fetchData = async () => {
        try {
          const { images: imgs, eventInfo: fetchedEventInfo } = await fetchGalleryViewData({
            folderId,
            passedEventInfo
          });
          
          setImages(imgs);
          
          // Only update event info if we don't have it from navigation state
          if (!passedEventInfo || !passedEventInfo.eventName || !passedEventInfo.eventDate) {
            setEventInfo(fetchedEventInfo);
          }
        } catch (error) {
          console.error('Error loading gallery view data:', error);
          setImages([]);
          // Only reset event info if we didn't get it from navigation state
          if (!passedEventInfo || !passedEventInfo.eventName) {
            setEventInfo({ event_name: "", event_date: "" });
          }
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [folderId, location.state, getPreloadedData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let eventDateStr = formatEventDate(eventInfo.event_date);

  return (
    <div className="flex flex-col min-h-screen bg-mainBg pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between md:px-8 md:py-6 md:min-h-64">
        <a
          href="/gallery"
          onClick={(e) => handlePageNavigation(e, "/gallery", "gallery")}
          className="flex items-center gap-2 md:border-r pr-20 border-borderColor hover:underline py-10 cursor-pointer"
        >
          <img src={arrowIcon} alt="Back" className="w-8 h-4 rotate-180" />
          <span className="font-ttjenevers text-base tracking-wide ml-4 uppercase">
            Back to all galleries
          </span>
        </a>
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
