
import { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useCachedBannerImages } from "../../hooks/useCachedBannerImages";
import ImagePlaceholder from "../../components/ImagePlaceholder";

const CLOUDINARY_FOLDER = "kp-main-banner";

const SplideBanner = () => {
  const splideRef = useRef(null);
  const { images, loading, fromCache, cacheInfo, error } = useCachedBannerImages(CLOUDINARY_FOLDER);

  // Hack: Trigger a small scroll after component mounts and images load
  // This forces the images to display correctly
  useEffect(() => {
    if (images.length > 0 && splideRef.current) {
      const timer = setTimeout(() => {
        try {
          const splide = splideRef.current.splide;
          if (splide) {
            splide.go('1'); // Move slightly forward
            setTimeout(() => {
            }, 200);
          }
        } catch (error) {
          console.log('Splide scroll hack failed:', error);
        }
      }, 500); // Small delay to ensure splide is fully initialized

      return () => clearTimeout(timer);
    }
  }, [images.length, loading]); // Run when images are loaded

  

  // Show loading state only if no cached images
  if (loading && images.length === 0) {
    return (
      <div className="relative flex items-center justify-center w-full h-[calc(70vh)] md:h-[calc(100vh-72px)] bg-colorSecondary">
        <ImagePlaceholder />
      </div>
    );
  }

  // Show error state if no images and there's an error
  if (error && images.length === 0) {
    return (
      <div className="relative flex items-center justify-center w-full h-[calc(70vh)] md:h-[calc(100vh-72px)] bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-red-600 font-barlow">Failed to load banner images</p>
          <p className="text-gray-500 text-sm">Please check your connection</p>
        </div>
      </div>
    );
  }

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
          autoplay: images.length > 1, // Only autoplay if multiple images
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
