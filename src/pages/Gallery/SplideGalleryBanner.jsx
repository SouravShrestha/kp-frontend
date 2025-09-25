
import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { Grid } from "@splidejs/splide-extension-grid";
import { useCachedBannerImages } from "../../hooks/useCachedBannerImages";
import "@splidejs/splide/dist/css/splide.min.css";
import ImagePlaceholder from "../../components/ImagePlaceholder";

const CLOUDINARY_FOLDER = "kp-gallery-banner";

const SplideGalleryBanner = () => {
  const { images, loading, fromCache, cacheInfo, error } = useCachedBannerImages(CLOUDINARY_FOLDER);

  const splideRef = useRef(null);

  useEffect(() => {
    if (images.length && splideRef.current) {
      const splide = new Splide(splideRef.current, {
        type: "loop",
        perPage: 2,
        perMove: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        autoplay: true,
        interval: 6000,
        arrows: false,
        pagination: false,
        drag: true,
        gap: "6px",
        lazyLoad: "nearby",
        breakpoints: {
          800: {
            grid: {
              rows: 2,
              cols: 1,
            },
          },
        },
        grid: {
          rows: 2,
          cols: 2,
          gap: {
            row: "6px",
            col: "6px",
          },
        },
      });
      splide.mount({ Grid });
      return () => {
        splide.destroy();
      };
    }
  }, [images]);

  // Show loading state only if no cached images
  if (loading && images.length === 0) {
    return (
      <div className="w-full h-[32rem] border-borderColor border-b-0 flex items-center justify-center bg-colorSecondary">
        <ImagePlaceholder title="loading gallery" />
      </div>
    );
  }

  // Show error state if no images and there's an error
  if (error && images.length === 0) {
    return (
      <div className="w-full h-[32rem] border-borderColor border-b-0 flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-red-600 font-barlow text-sm">Failed to load gallery banner</p>
          <p className="text-gray-500 text-xs">Please check your connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[32rem] border-borderColor border-b-0 relative">
      <div className="splide" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((img, idx) => 
              img ? (
                <li className="splide__slide" key={idx}>
                  <img
                    src={img}
                    alt={`Gallery Banner ${idx + 1}`}
                    className="object-cover h-64 w-full"
                  />
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SplideGalleryBanner;
