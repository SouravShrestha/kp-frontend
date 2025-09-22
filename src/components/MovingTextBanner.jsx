
import React from "react";
import Marquee from "react-fast-marquee";
import texts from "../resources/texts";

const MovingTextBanner = () => (
  <div
    className="border-t border-b border-mainText overflow-hidden relative"
    style={{ height: "48px" }}
  >
    <Marquee
      gradient={false}
      speed={40}
      pauseOnHover={false}
      className="flex items-center h-full"
    >
      <div className="flex items-center">
  {texts.movingTextBanner.textItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="mx-8 text-sm font-ttjenevers tracking-wide">
              {item}
            </span>
            <span className="text-xl mb-1.5">&bull;</span>
          </React.Fragment>
        ))}
  {[...texts.movingTextBanner.textItems, ...texts.movingTextBanner.textItems].map((item, idx, arr) => (
          <React.Fragment key={idx}>
            <span className="mx-8 text-sm font-ttjenevers tracking-wide">
              {item}
            </span>
            <span className="text-xl mb-1">&bull;</span>
          </React.Fragment>
        ))}
      </div>
    </Marquee>
  </div>
);

export default MovingTextBanner;
