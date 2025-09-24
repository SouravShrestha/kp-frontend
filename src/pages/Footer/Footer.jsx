import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import fbIcon from "../../assets/icons/fb.png";
import instaIcon from "../../assets/icons/insta.png";
import phoneIcon from "../../assets/icons/phone.png";
import emailIcon from "../../assets/icons/email.png";
import locationIcon from "../../assets/icons/location.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import texts from "../../resources/texts";
import ContactForm from "./ContactForm";
import { MediaAPI } from "../../apis";

const Footer = () => {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  const [images, setImages] = useState([]);
  const CLOUDINARY_FOLDER = "kp-footer-banner";
  useEffect(() => {
    MediaAPI.fetchImagesByFolderName(CLOUDINARY_FOLDER)
      .then((data) =>
        setImages(
          Array.isArray(data)
            ? data.map((item) => item.cloudinary_image_url)
            : []
        )
      )
      .catch(() => setImages([]));
  }, []);
  return (
    <footer className="border-t border-borderColor w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row border-b border-borderColor h-full">
          {/* Left: Contact Form */}
          {!isContactPage && (
            <div className="basis-2/5 grow-0 shrink-0 py-12 md:py-8 border-b md:border-b-0 md:border-r border-borderColor md:px-12 px-8">
              <h3 className="font-ttjenevers text-2xl mb-4 mt-2">
                {texts.footer.bookSession}
              </h3>
              <ContactForm />
            </div>
          )}
          {/* Right: Menu & Contact */}
          <div
            className={isContactPage ? "w-full" : "md:basis-3/5 grow-0 shrink-0"}
          >
            <div className="flex flex-col h-full">
              <div className="py-8 md:pl-8 pl-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-meysha text-4xl tracking-wider">
                    Menu
                  </span>
                  <div className="flex gap-4 pr-8">
                    <a
                      href={texts.footer.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <img
                        src={instaIcon}
                        alt="Instagram"
                        className="w-6 h-6"
                      />
                    </a>
                    <a
                      href={texts.footer.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <img src={fbIcon} alt="Facebook" className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                <hr className="md:ml-20 ml-6 border-borderColor" />
                {(() => {
                  const footerLinks = [
                    { to: "/", label: "HOME" },
                    { to: "/gallery", label: "GALLERY" },
                    { to: "/packages", label: "PACKAGES" },
                    { to: "/contact", label: "CONTACT" },
                    { to: "/faq", label: "FAQ" },
                  ];
                  return (
                    <div
                      className={`grid grid-cols-2 gap-x-8 gap-y-8 font-barlow tracking-wider text-base ml-8 md:ml-20 mt-10 ${
                        isContactPage ? "w-1/2" : ""
                      }`}
                    >
                      {footerLinks.map(link => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={
                            `underline-offset-4 w-fit px-2 -mx-2 ${location.pathname === link.to ? 'underline' : ''} hover:underline`
                          }
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  );
                })()}
              </div>
              <div className="flex-1 p-6 md:p-8 flex md:flex-row justify-start md:justify-end items-start md:items-end md:mb-8 py-12">
                <div className="font-meysha text-4xl text-right rotate-[-30deg] -ml-4 md:ml-0">
                  Quick
                  <br />
                  Contact
                </div>
                <div className="md:ml-20 ml-8">
                  <div className="flex items-center gap-2 mb-5 font-almarai text-sm tracking-wide">
                    <img src={emailIcon} alt="email" className="w-4 h-4 mr-2" />
                    <a 
                      href={`mailto:${texts.footer.email}`}
                      className="hover:underline cursor-pointer"
                    >
                      {texts.footer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mb-5 font-almarai text-sm tracking-wide">
                    <img src={phoneIcon} alt="phone" className="w-4 h-4 mr-2" />
                    <a 
                      href={`tel:${texts.footer.phone}`}
                      className="hover:underline cursor-pointer"
                    >
                      {texts.footer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 font-almarai text-sm ">
                    <img
                      src={locationIcon}
                      alt="location"
                      className="w-4 h-4 mr-2"
                    />
                    {texts.footer.address[0]}
                    <br />
                    {texts.footer.address[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Bottom: Gallery */}
          <div className="flex flex-row w-full mt-6 gap-x-2">
            <Splide
              key={images.length}
              options={{
                type: "loop",
                start: 0,
                perPage: 4.5,
                breakpoints: {
                  1536: { perPage: 4.5 },
                  1280: { perPage: 4 },
                  1024: { perPage: 3.5 },
                  768: { perPage: 2 },
                },
                focus: "center",
                pauseOnFocus: false,
                pauseOnHover: false,
                autoplay: true,
                interval: 4000,
                arrows: false,
                pagination: false,
                drag: true,
              }}
            >
              {images.map((img, idx) => 
                img ? (
                  <SplideSlide key={images.length + idx}>
                    <img
                      src={img}
                      alt={`Banner ${idx + 1}`}
                      className="object-cover object-center transition-all duration-2000 h-44 w-44 md:h-72 md:w-72 lg:h-72 lg:w-72"
                    />
                  </SplideSlide>
                ) : null
              )}
            </Splide>
          </div>
          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between md:items-center items-center gap-y-2 px-4 py-6 text-xs font-almarai">
            <span>© KRIVA PICTURES 2025. ALL RIGHTS RESERVED.</span>
            <span>PHOTOS BY KRIVA PICTURES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
