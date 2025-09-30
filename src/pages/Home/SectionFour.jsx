import { useNavigate } from "react-router-dom";
import { usePagePreloaderContext } from "../../contexts/PagePreloaderContext";
import { createPageNavigationHandler } from "../../utils/navigationUtils";
import imgA from "../../assets/images/section-images/section-4a.png";
import imgB from "../../assets/images/section-images/section-4b.png";
import arrowIcon from "../../assets/icons/arrow.svg";
import texts from "../../resources/texts";
import ImagePlaceholder from "../../components/ImagePlaceholder";

const SectionFour = () => {
  const navigate = useNavigate();
  const { preloadPageData } = usePagePreloaderContext();
  
  const handlePageNavigation = createPageNavigationHandler(preloadPageData, navigate);

  return (
    <section className="w-full flex flex-col md:flex-row items-center bg-[#ede7df] -mt-32 border-t border-borderColor justify-between">
      <div className="relative w-full md:hidden">
        <img
          src={imgB}
          className="object-cover h-[50vh] w-full border-l-0 border-borderColor md:hidden relative z-10"
        />
        <div className="h-[50vh] w-full md:hidden bg-mainBg absolute top-0">
          <ImagePlaceholder />
        </div>
      </div>
      <div className="md:w-2/3 w-full p-8 flex flex-col md:flex-row items-center justify-center gap-x-28">
        {/* Left image */}
        <div className="flex flex-col items-end">
          <div className="relative">
          <img
            src={imgA}
            alt="Child in purple dress"
            className="w-56 h-64 object-cover mb-8 md:mb-0 -translate-y-1/2 md:-translate-y-0 rounded-sm md:rounded-none z-20 relative"
          />
          <div className="w-56 h-64 mb-8 md:mb-0 -translate-y-1/2 md:-translate-y-0 rounded-sm md:rounded-none z-10 absolute top-0 bg-colorSecondary">
            <ImagePlaceholder />
          </div>

          </div>
          <a
            href="/contact"
            onClick={(e) => handlePageNavigation(e, "/contact", "contact")}
            className="cursor-pointer"
          >
            <button className="mt-8 md:flex items-center gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline hidden">
              {texts.sectionFour.button}
              <img src={arrowIcon} alt="arrow" className="w-6 h-6" />
            </button>
          </a>
        </div>
        {/* Center content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:-mt-10 -mt-28">
          <h2 className="font-meysha text-5xl md:text-6xl text-mainText mb-12 rotate-[-15deg]">
            {texts.sectionFour.aboutMe}
          </h2>
          <div className="font-ttjenevers text-xl text-mainText mb-8">
            {texts.sectionFour.subtitle}
          </div>
          {texts.sectionFour.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-justify font-almarai text-base text-mainText max-w-md leading-7${
                i > 0 ? " mt-4" : ""
              }`}
            >
              {p}
            </p>
          ))}
        </div>
        <div className="w-full flex justify-end md:hidden my-2">
          <a
            href="/contact"
            onClick={(e) => handlePageNavigation(e, "/contact", "contact")}
            className="cursor-pointer"
          >
            <button className="mt-8 flex gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline md:hidden">
              {texts.sectionFour.button}
              <img src={arrowIcon} alt="arrow" className="w-6 h-6" />
            </button>
          </a>
        </div>
      </div>
      {/* Right image */}
      <div className="w-1/3 md:flex items-center justify-end hidden">
        <div className="relative w-full">
          <img
            src={imgB}
            className="object-cover h-screen w-full border-l-0 border-borderColor relative z-10"
          />
          <div className="h-screen w-full bg-mainBg absolute top-0">
            <ImagePlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFour;
