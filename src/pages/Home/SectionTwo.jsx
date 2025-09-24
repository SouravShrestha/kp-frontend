
import React from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../../assets/icons/arrow.svg";
import imgA from "../../assets/images/section-images/section-2a.png";
import imgB from "../../assets/images/section-images/section-2b.png";
import imgC from "../../assets/images/section-images/section-2c.png";
import texts from "../../resources/texts";

const images = [imgA, imgB, imgC];

const SectionTwo = () => (
  <section className="w-full bg-[#ede7df] border-borderColor">
    <div className="mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-borderColor">
      {texts.sectionTwo.services.map((s, i) => (
        <div key={i} className="flex flex-col items-center px-6 py-10 flex-1">
          <img
            src={images[i]}
            alt={s.title}
            className="object-cover mb-8 md:h-64 md:w-64 rounded-sm"
          />
          <h1 className="font-meysha text-4xl mb-6 text-center">{s.title}</h1>
          <p className="font-almarai leading-7 text-base text-justify text-mainText max-w-xs">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
    <div className="w-full border-t border-borderColor flex justify-end items-center md:px-8 px-6 py-4">
      <Link
        to="/packages"
        className="flex items-center gap-3 text-mainText md:text-[1.25rem] text-[1.10rem] font-ttjenevers tracking-wide hover:underline"
      >
        <button className="flex gap-2 text-mainText font-barlow tracking-widest text-base group hover:underline uppercase">
          {texts.sectionTwo.button}
          <img src={arrowIcon} alt="arrow" className="w-6 h-6" />
        </button>
      </Link>
    </div>
  </section>
);

export default SectionTwo;
