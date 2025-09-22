import React from "react";
import imgA from "../../assets/images/section-images/section-3a.png";
import imgB from "../../assets/images/section-images/section-3b.png";
import quoteIcon from "../../assets/icons/quote.png";
import arrowIcon from "../../assets/icons/arrow.svg";

const testimonial = {
  quote: "My family was blown away when they saw the beautiful photos.",
  details: `"She delivered on time and the photos look amazing. They turned out exactly and I mean exactly how I envisioned. I couldn't believe it. Have even more to say? OK but keep it short though!"`,
  name: "LISA & STEVIE | GENDER REVEAL",
};

const SectionThree = () => (
  <section className="w-full border-t border-mainText flex flex-col items-center justify-center">
    {/* Top image and heading */}
    <div className="w-full flex-col items-center justify-center overflow-hidden relative">
      <img
        src={imgA}
        alt="child and dog"
        className="object-cover object-center h-[50vh] md:h-auto w-full"
      />
      <div className="absolute z-10 flex flex-col items-end justify-center pr-12 pt-8 md:top-10 right-5">
        <div className="text-right">
          <span className="block text-white text-5xl font-ttjenevers tracking-wide leading-tight">
            LETS DO THINGS
          </span>
          <span className="block text-white text-5xl font-ttjenevers tracking-wide leading-tight mt-6">
            a Little{" "}
            <span className="font-meysha text-5xl ml-2">differently</span>
          </span>
        </div>
      </div>
    </div>

    {/* Testimonial card */}
    <div className="ml-1/2 w-full px-8 md:px-0 flex flex-1 justify-center -translate-y-1/4 z-30 flex-col">
      <div className="flex-row flex items-center gap-4 md:gap-8 justify-center">
        <button className="md:flex flex-row items-center text-mainText text-lg font-barlow mt-0 hidden">
          <img src={arrowIcon} alt="previous" className="w-8 h-8 rotate-180" />
          <div className="flex flex-col gap-1 ml-5">
            <span className="text-xs tracking-widest font-semibold">PR</span>
            <span className="text-xs tracking-widest font-semibold">EV</span>
          </div>
        </button>
        <div className="flex flex-col md:flex-row bg-mainBg border border-mainText max-w-5xl z-30">
          {/* Left: Quote */}
          <div className="flex-1 flex flex-col justify-center md:p-8 p-5 pt-8 border-b md:border-b-0 md:border-r border-mainText items-center md:items-start">
            <div className="flex justify-between items-center w-full mb-6">
              <button className="md:hidden flex flex-row items-center text-mainText text-lg font-barlow mt-0">
                <img
                  src={arrowIcon}
                  alt="previous"
                  className="w-8 h-8 rotate-180"
                />
                <div className="flex flex-col gap-1 ml-5">
                  <span className="text-xs tracking-widest font-semibold">
                    PR
                  </span>
                  <span className="text-xs tracking-widest font-semibold">
                    EV
                  </span>
                </div>
              </button>
              <img src={quoteIcon} alt="quote" className="w-5 h-5 mb-6 " />
              <button className="md:hidden flex flex-row items-center text-mainText text-lg font-barlow mt-0">
                <div className="flex flex-col gap-1 mr-5">
                  <span className="text-xs tracking-widest font-semibold">
                    NE
                  </span>
                  <span className="text-xs tracking-widest font-semibold">
                    XT
                  </span>
                </div>
                <img src={arrowIcon} alt="next" className="w-8 h-8" />
              </button>
            </div>
            <div className="font-ttjenevers text-xl md:text-2xl text-mainText mb-4 tracking-wide leading-snug">
              {testimonial.quote}
            </div>
            <div className="font-barlow text-base text-mainText leading-relaxed">
              {testimonial.details}
            </div>
          </div>
          {/* Right: Image and label */}
          <div className="flex-1 flex md:flex-row flex-col items-center justify-center relative">
            <div className="flex items-center justify-center h-full w-full md:w-16 rg:flex py-4 md:py-0">
              <span
                className="text-mainText text-sm md:text-base font-barlow md:absolute tracking-widest md:[transform:rotate(90deg)] text-center w-full md:w-fit md:text-start"
              >
                {testimonial.name}
              </span>
            </div>
            <img
              src={imgB}
              alt="testimonial event"
              className="w-full object-cover object-center h-[280px] md:h-[420px] border-t md:border-t-0 md:border-l border-mainText"
            />
          </div>
        </div>
        <button className="md:flex flex-row items-center text-mainText text-lg font-barlow mt-0 hidden">
          <div className="flex flex-col gap-1 mr-5">
            <span className="text-xs tracking-widest font-semibold">NE</span>
            <span className="text-xs tracking-widest font-semibold">XT</span>
          </div>
          <img src={arrowIcon} alt="next" className="w-8 h-8" />
        </button>
      </div>

      {/* LOVE notes background text - behind card */}
      <div
        className="w-full pointer-events-none select-none"
        style={{ transform: "translateY(-15%)" }}
      >
        <span className="block w-full text-center text-[4rem] md:text-[12rem] font-ttjenevers text-mainText/10 leading-none tracking-wider">
          LOVE{" "}
          <span className="font-meysha text-[3rem] md:text-[9rem] align-middle -ml-6 md:-ml-12">
            notes
          </span>
        </span>
      </div>
    </div>
  </section>
);

export default SectionThree;
