import Footer from "../Footer/Footer";
import MovingTextBanner from "../../components/MovingTextBanner";
import Navbar from "../../components/Navbar";
import SplideBanner from "./SplideBanner";
import SectionFour from "./SectionFour";
import SectionOne from "./SectionOne";
import SectionThree from "./SectionThree";
import SectionTwo from "./SectionTwo";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="bg-mainBg text-mainText md:min-h-screen relative flex flex-col">
        <SplideBanner />
        <Navbar />
      </div>
      <div className="bg-mainBg text-mainText relative flex flex-col">
        <SectionOne />
        <MovingTextBanner />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </div>
    </>
  );
};

export default HomePage;
