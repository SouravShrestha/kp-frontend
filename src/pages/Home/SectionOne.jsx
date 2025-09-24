import { Link } from "react-router-dom";
import sectionImage from "../../assets/images/section-images/section-1a.jpg";
import texts from "../../resources/texts";
import arrowIcon from "../../assets/icons/arrow.svg";

const SectionOne = () => (
  <section className="w-full flex rg:flex-row md:mt-0 flex-col-reverse flex-1 md:h-[calc(100vh-64px)] mt-4 items-center">
    <div className="flex items-start rg:items-center justify-center h-72 w-full md:h-auto md:w-auto">
      <img
        src={sectionImage}
        alt="Celebration"
        className="rg:w-auto w-full h-72 object-cover rg:h-[calc(100vh-64px)]"
      />
    </div>
    <div className="flex items-center justify-center h-full w-full md:w-32 rg:flex">
      <span
        className="text-mainText text-2xl md:text-4xl font-meysha tracking-wide md:absolute md:-ml-24 md:whitespace-nowrap md:[transform:rotate(90deg)] text-center w-full md:w-fit md:text-start"
        style={{ whiteSpace: "normal" }}
      >
        {texts.sectionOne.heading}
      </span>
    </div>
    <div className="flex flex-col flex-1 items-start justify-center h-full rg:pl-20 md:p-12 p-8">
      <div className="flex flex-col rg:text-5xl text-4xl font-ttjenevers items-start tracking-wide">
        <span>{texts.sectionOne.celebrations}</span>
        <span className="font-meysha -my-3 mb-0">{texts.sectionOne.and}</span>
        <span>{texts.sectionOne.moments}</span>
      </div>
      <span className="mt-8 max-w-lg text-xl font-ttjenevers tracking-wide">
        {texts.sectionOne.subheading}
      </span>
      {/* Full description for md and up */}
      <span className="mt-8 max-w-xl text-base font-almarai leading-7 hidden md:block">
        {texts.sectionOne.description}
      </span>
      {/* Short description for below md */}
      <span className="mt-8 max-w-xl text-base font-almarai leading-8 block tracking-wide md:hidden">
        {texts.sectionOne.descriptionShort}
      </span>
      <div className="w-full flex justify-end md:justify-start my-2 md:mt-5">
        <Link to="/packages">
          <button className="mt-8 flex gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline">
            {texts.sectionOne.button}
            <img src={arrowIcon} alt="arrow" className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default SectionOne;
