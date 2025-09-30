import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePagePreloaderContext } from "../contexts/PagePreloaderContext";
import { createPageNavigationHandler } from "../utils/navigationUtils";
import menuIcon from "../assets/icons/menu.png";
import logoIcon from "../assets/icons/logo.png";
import SlidingNavbar from "./SlidingNavbar";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { preloadPageData } = usePagePreloaderContext();
  
  const handlePageNavigation = createPageNavigationHandler(preloadPageData, navigate);

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
        className={`flex items-center justify-between md:pl-4 bg-mainBg border-borderColor transition-all duration-300 z-50 border-t-0 w-full h-64 ${
          location.pathname === "/" ? "border-b-1.5" : "border-b-0"
        }`}
        style={
          isSticky &&
          location.pathname === "/" &&
          typeof window !== "undefined" &&
          window.innerWidth >= 768
            ? {
                height: "72px",
                position: "fixed",
              }
            : { height: "72px" }
        }
      >
        <a
          href="/"
          onClick={(e) => handlePageNavigation(e, "/", "home")}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2.5 h-9 ml-8">
            <img
              src={logoIcon}
              alt="Kriva Pictures Logo"
              className="h-[29px] w-auto md:h-9"
            />
            <div className="md:h-10 h-9 flex flex-col justify-around leading-none">
              <span className="font-barlow text-sm tracking-wide leading-none">KRIVA PICTURES</span>
              <span className="block text-[10.5px] font-almarai tracking-wide leading-none">PHOTOGRAPHY</span>
            </div>
          </div>
        </a>
        <div className="flex items-center">
          <div className="py-4 px-8 gap-8">
            {(() => {
              const navLinks = [
                { href: "/", label: "HOME", preload: true, pageName: "home" },
                { href: "/gallery", label: "GALLERY", preload: true, pageName: "gallery" },
                { href: "/packages", label: "PACKAGES", preload: true, pageName: "packages" },
                { href: "/contact", label: "CONTACT", preload: true, pageName: "contact" },
              ];
              return (
                <ul className="hidden space-x-7 md:flex mdxl:space-x-10 lg:space-x-14 text-mainText font-barlow font-medium tracking-wide text-sm">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handlePageNavigation(e, link.href, link.pageName)}
                        className={`hover:text-mainText transition-all duration-200 cursor-pointer ${
                          location.pathname === link.href
                            ? "border-b border-borderColor"
                            : "hover:border-b border-borderColor"
                        }`}
                        style={{ paddingBottom: "4px" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>
          <div
            className="px-8 flex items-center border-l-0 border-borderColor cursor-pointer"
            style={{ height: "72px" }}
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