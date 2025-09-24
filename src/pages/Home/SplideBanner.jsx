
import { useRef, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { MediaAPI } from "../../apis";

const CLOUDINARY_FOLDER = "kp-main-banner";

const SplideBanner = () => {
  const splideRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    MediaAPI.fetchImagesByFolderName(CLOUDINARY_FOLDER)
      .then(data => setImages(Array.isArray(data) ? data.map(item => item.cloudinary_image_url) : []))
      .catch(() => setImages([]));
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[calc(70vh)] md:h-[calc(100vh-72px)]">
      <Splide
        className="splideHome"
        key={images.length}
        ref={splideRef}
        options={{
          type: "loop",
          start: 0,
          focus: "center",
          pauseOnFocus: false,
          pauseOnHover: false,
          padding: "15%",
          autoplay: true,
          interval: 4000,
          arrows: false,
          pagination: false,
          drag: true,
          lazyLoad: "nearby",
          breakpoints: {
            1440: { padding: "15%" },
            1280: { padding: "5%" },
            1024: { padding: "0%" },
            768: { padding: "0%" },
          },
        }}
        style={{ height: "calc(100vh - 72px)" }}
      >
        {images.map((img, idx) => 
          img ? (
            <SplideSlide key={idx}>
              <img
                data-splide-lazy={img}
                alt={`Banner ${idx + 1}`}
                className="transition-all duration-2000 h-full w-auto object-cover"
                style={{ height: "calc(100vh - 72px)" }}
              />
            </SplideSlide>
          ) : null
        )}
      </Splide>
    </div>
  );
};

export default SplideBanner;
