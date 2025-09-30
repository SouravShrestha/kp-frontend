
import { useNavigate } from "react-router-dom";
import { usePagePreloaderContext } from "../../contexts/PagePreloaderContext";
import { createPageNavigationHandler } from "../../utils/navigationUtils";
import arrowIcon from "../../assets/icons/arrow.svg";
import imgA from "../../assets/images/section-images/section-2a.png";
import imgB from "../../assets/images/section-images/section-2b.png";
import imgC from "../../assets/images/section-images/section-2c.png";
import texts from "../../resources/texts";
import ImagePlaceholder from "../../components/ImagePlaceholder";

const images = [imgA, imgB, imgC];

const SectionTwo = () => {
  const navigate = useNavigate();
  const { preloadPageData } = usePagePreloaderContext();
  
  const handlePageNavigation = createPageNavigationHandler(preloadPageData, navigate);

  return (
    <section className="w-full bg-[#ede7df] border-borderColor">
      <div className="mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-borderColor">
        {texts.sectionTwo.services.map((s, i) => (
          <div key={i} className="flex flex-col items-center px-6 py-10 flex-1">
            <div className="relative">
              <img
                src={images[i]}
                alt={s.title}
                className="object-cover mb-8 h-64 md:w-64 rounded-sm relative z-10"
              />
              <div className="absolute w-full object-cover mb-8 h-64 md:w-64 rounded-sm top-0 bg-colorSecondary">
                <ImagePlaceholder />
              </div>
            </div>
            <h1 className="font-meysha text-4xl mb-6 text-center">{s.title}</h1>
            <p className="font-almarai leading-7 text-base text-justify text-mainText max-w-xs">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full border-t border-borderColor flex justify-end items-center md:px-8 px-6 py-4">
        <a
          href="/packages"
          onClick={(e) => handlePageNavigation(e, "/packages", "packages")}
          className="flex items-center gap-3 text-mainText md:text-[1.25rem] text-[1.10rem] font-ttjenevers tracking-wide hover:underline cursor-pointer"
        >
          <button className="flex gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline uppercase">
            {texts.sectionTwo.button}
            <img src={arrowIcon} alt="arrow" className="w-6 h-6" />
          </button>
        </a>
      </div>
    </section>
  );
};

export default SectionTwo;
