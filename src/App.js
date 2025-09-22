
import HomePage from "./pages/Home/HomePage";
import PackageMain from "./pages/Packages/PackageMain";
import ContactMain from "./pages/Contact/ContactMain";
import GalleryMain from "./pages/Gallery/GalleryMain";
import GalleryView from "./pages/Gallery/GalleryView";
import AboutMain from "./pages/About/AboutMain";
import FaqMain from "./pages/FAQ/FaqMain";
import Navbar from "./components/Navbar";
import "./assets/styles/index.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./pages/Footer/Footer";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="bg-mainBg min-h-screen">
      {!isHome && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/packages" element={<PackageMain />} />
        <Route path="/contact" element={<ContactMain />} />
        <Route path="/gallery" element={<GalleryMain />} />
        <Route path="/gallery/:folderId" element={<GalleryView />} />
        <Route path="/about" element={<AboutMain />} />
        <Route path="/faq" element={<FaqMain />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;