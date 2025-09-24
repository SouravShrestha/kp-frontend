import HomePage from "./pages/Home/HomePage";
import PackageMain from "./pages/Packages/PackageMain";
import ContactMain from "./pages/Contact/ContactMain";
import GalleryMain from "./pages/Gallery/GalleryMain";
import GalleryView from "./pages/Gallery/GalleryView";
import FaqMain from "./pages/FAQ/FaqMain";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer/Footer";
import "./assets/styles/index.css";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
        <Route path="/faq" element={<FaqMain />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  const RouterType = window.location.hostname.includes("github.io")
    ? HashRouter
    : BrowserRouter;

  return (
    <RouterType>
      <AppContent />
    </RouterType>
  );
}

export default App;
