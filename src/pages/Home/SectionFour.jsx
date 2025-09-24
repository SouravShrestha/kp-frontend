import React from "react";
import { Link } from "react-router-dom";
import imgA from "../../assets/images/section-images/section-4a.png";
import imgB from "../../assets/images/section-images/section-4b.png";
import arrowIcon from "../../assets/icons/arrow.svg";
import texts from "../../resources/texts";

const SectionFour = () => (
  <section className="w-full flex flex-col md:flex-row items-center bg-[#ede7df] -mt-32 border-t border-borderColor justify-between">
    <img
      src={imgB}
      className="object-cover h-[50vh] w-full border-l-0 border-borderColor md:hidden"
    />
    <div className="md:w-2/3 w-full p-8 flex flex-col md:flex-row items-center justify-center gap-x-28">
      {/* Left image */}
      <div className="flex flex-col items-end">
        <img
          src={imgA}
          alt="Child in purple dress"
          className="w-56 h-64 object-cover mb-8 md:mb-0 -translate-y-1/2 md:-translate-y-0 rounded-sm md:rounded-none"
        />
        <Link to="/contact">
          <button className="mt-8 md:flex items-center gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline hidden ">
            {texts.sectionFour.button}
            <img src={arrowIcon} alt="arrow" className="w-6 h-6" />
          </button>
        </Link>
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
      <Link to="/contact">
        <button className="mt-8 flex gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline md:hidden">
          {texts.sectionFour.button}
          <img src={arrowIcon} alt="arrow" className="w-6 h-6" />
        </button>
      </Link>
      </div>
    </div>
    {/* Right image */}
    <div className="w-1/3 md:flex items-center justify-end hidden">
      <img
        src={imgB}
        className="object-cover h-screen w-full border-l-0 border-borderColor"
      />
    </div>
  </section>
);

export default SectionFour;
