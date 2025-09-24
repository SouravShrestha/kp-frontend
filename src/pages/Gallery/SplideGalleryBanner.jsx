
import { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import { Grid } from "@splidejs/splide-extension-grid";
import { MediaAPI } from "../../apis";
import "@splidejs/splide/dist/css/splide.min.css";

const CLOUDINARY_FOLDER = "kp-gallery-banner";

const SplideGalleryBanner = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    MediaAPI.fetchImagesByFolderName(CLOUDINARY_FOLDER)
      .then(data => setImages(Array.isArray(data) ? data.map(item => item.cloudinary_image_url) : []))
      .catch(() => setImages([]));
  }, []);

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

  return (
    <div className="w-full h-full min-h-[32rem] border-borderColor border-b-0">
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
