import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuIcon from "../assets/icons/menu.png";
import SlidingNavbar from "./SlidingNavbar";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsSticky(false);
      return;
    }
    const handleScroll = () => {
      if (!navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const banner = document.querySelector('.splideHome');
      const bannerRect = banner ? banner.getBoundingClientRect() : null;
      if (navRect.top <= 0 && (!bannerRect || bannerRect.bottom <= 0)) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className={`flex items-center justify-between pl-8 py-4 bg-mainBg border-mainText transition-all duration-300 z-50 border-t-0 w-full h-64 ${location.pathname === '/gallery' ? '' : 'border-b-1.5'}`}
        style={
          isSticky &&
          location.pathname === "/" &&
          typeof window !== "undefined" &&
          window.innerWidth >= 768
            ? {
                height: "64px",
                position: "fixed",
              }
            : { height: "64px" }
        }
      >
        <h1 className="text-3xl font-meysha text-mainText">Kriva pictures</h1>
        <div className="flex items-center">
          <div className="py-4 px-8 gap-8">
            {(() => {
              const navLinks = [
                { href: "/", label: "HOME" },
                { href: "/gallery", label: "GALLERY" },
                { href: "/packages", label: "PACKAGES" },
                { href: "/about", label: "ABOUT" },
                { href: "/contact", label: "CONTACT" },
              ];
              return (
                <ul className="hidden space-x-7 md:flex mdxl:space-x-10 lg:space-x-14 text-mainText font-barlow font-medium tracking-wide text-sm">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className={`hover:text-mainText transition-all duration-200 ${
                          location.pathname === link.href
                            ? "border-b border-mainText"
                            : "hover:border-b border-mainText"
                        }`}
                        style={{ paddingBottom: "4px" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
          <div
            className="px-8 flex items-center border-l-0 border-mainText cursor-pointer"
            style={{ height: "64px" }}
            onClick={() => setShowMenu(true)}
          >
            <img src={menuIcon} alt="Menu" className="w-4 h-4" />
          </div>
        </div>
      </nav>
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setShowMenu(false)}
            aria-label="Close menu overlay"
          />
          <SlidingNavbar
            onClose={() => setShowMenu(false)}
            onMenuItemClick={() => setShowMenu(false)}
          />
        </>
      )}
    </>
  );
};

export default Navbar;