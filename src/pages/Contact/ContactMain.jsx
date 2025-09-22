import emailIcon from "../../assets/icons/email.png";
import phoneIcon from "../../assets/icons/phone.png";
import locationIcon from "../../assets/icons/location.png";
import fbIcon from "../../assets/icons/fb.png";
import instaIcon from "../../assets/icons/insta.png";
import texts from "../../resources/texts";
import ContactForm from "../Footer/ContactForm";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ContactMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col py-10 md:py-20 px-8">
      {/* Heading */}
      <div className="w-full max-w-2xl mx-auto mb-4">
        <h2 className="text-center font-ttjenevers text-2xl md:text-3xl text-mainText">
          Fill up the form below
          <br />
          and we'll get back to you as soon as we can.
        </h2>
      </div>

      {/* Top: FAQ */}
      <div className="w-full max-w-3xl mx-auto md:mb-12 mb-6">
        <div className="font-barlow text-mainText text-base flex flex-row flex-wrap items-center justify-center gap-1">
          <span>
            Have questions? We may have your answer in our FAQ section. Take a quick look{' '}
            <Link to="/faq" className="underline hover:text-mainText inline">
              here!
            </Link>
          </span>
        </div>
      </div>

      {/* Contact Section: Two columns */}
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row md:mt-8">
        {/* Left: Contact Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-10 md:p-10 md:border-r border-mainText text-right md:pr-24 pr-0">
          <div>
            <div className="flex items-center justify-end gap-2 uppercase tracking-wide text-sm mb-2">
              <img src={emailIcon} alt="email" className="w-3 h-3" />
              Email
            </div>
            <div className="font-barlow text-sm text-mainText">
              {texts.footer.email}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-end gap-2 uppercase tracking-wide text-sm mb-2">
              <img src={phoneIcon} alt="phone" className="w-3 h-3" />
              Phone
            </div>
            <div className="font-barlow text-sm text-mainText">
              {texts.footer.phone}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-end gap-2 uppercase tracking-wide text-sm mb-2">
              <img src={locationIcon} alt="address" className="w-3 h-3" />
              Address
            </div>
            <div className="font-barlow text-sm text-mainText">
              {texts.footer.address[0]}
            </div>
            <div className="font-barlow text-sm text-mainText">
              {texts.footer.address[1]}
            </div>
          </div>
          <div>
            <div className="uppercase tracking-wide text-sm mb-2">Social</div>
            <div className="flex gap-4 mt-2 w-full justify-end">
              <a href={texts.footer.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src={instaIcon} alt="Instagram" className="w-6 h-6" />
              </a>
              <a href={texts.footer.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src={fbIcon} alt="Facebook" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        {/* Right: Contact Form */}
        <div className="w-full md:w-2/3 flex flex-col justify-center items-center md:pb-10 pb-16 md:px-24">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactMain;
