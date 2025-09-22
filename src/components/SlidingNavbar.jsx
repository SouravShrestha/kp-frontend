import React from "react";
import img1 from "../assets/images/section-images/section-3a.png";
import instaIcon from "../assets/icons/insta.png";
import fbIcon from "../assets/icons/fb.png";

import crossIcon from "../assets/icons/cross.png";
import texts from "../resources/texts";

const SlidingNavbar = ({ onClose, onMenuItemClick }) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/packages', label: 'Packages' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
  <div
    className="fixed top-0 right-0 h-full w-full rg:w-[660px] z-50 bg-[#ede7df] transition-all duration-500 border-l border-mainText flex flex-col justify-between"
    onClick={(e) => e.stopPropagation()}
  >
    <button
      onClick={onClose}
      className="absolute top-8 right-8 hover:scale-110 transition-transform z-50"
      aria-label="Close menu"
    >
      <img src={crossIcon} alt="Close" className="w-7 h-7" />
    </button>
    <div className="flex flex-col md:flex-row flex-1 md:flex-0 p-8">
      <h2 className="font-meysha text-5xl md:hidden mt-[8vh] text-left tracking-wide">Kriva Pictures</h2>
      {/* Left: Welcome, Image, Bio */}
      <div className="md:flex hidden flex-col items-start justify-between w-full sm:p-6">
        <div>
          <h2 className="font-meysha text-3xl mb-12 rotate-[-5deg]">
            Nice to meet you!
          </h2>
          <img
            src={img1}
            className="w-64 h-32 object-cover rounded-none mb-8"
          />
          <p className="font-barlow text-base text-mainText max-w-xs leading-7">
            {texts.slidingNavbar.bio}
          </p>
        </div>
      </div>
      {/* Right: Menu & Close */}
      <div className="flex flex-col items-start md:items-end justify-between w-full sm:w-2/4 md:w-1/3 md:p-14 p-8 py-10 relative border-l-1.5 md:border-l-0 border-mainText mt-12 md:mt-0">
        <nav className="flex flex-col items-start md:items-end justify-center flex-1 gap-y-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={onMenuItemClick}
              className={`font-barlow text-2xl md:text-xl border-b-1.5 hover:border-mainText ${currentPath === link.href ? 'border-mainText' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
    <div className="w-full flex flex-row px-8 md:px-20 pr-12 mb-14 justify-between items-center">
      <span className="font-barlow tracking-wider text-base font-semibold">
        FOLLOW US
      </span>
      <div className="md:w-2/5 w-1/4 border-b-1.5 border-mainText"></div>
      <div className="flex flex-row gap-6 text-2xl">
        <a
          href={texts.footer.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src={instaIcon} alt="Instagram" className="w-5 h-5" />
        </a>
        <a
          href={texts.footer.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <img src={fbIcon} alt="Facebook" className="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
  );
};

export default SlidingNavbar;
