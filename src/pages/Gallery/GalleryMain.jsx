import SplideGalleryBanner from "./SplideGalleryBanner";
import { useEffect, useState } from "react";
import { usePagePreloaderContext } from "../../contexts/PagePreloaderContext";
import { fetchGalleryData, fetchTabData } from "../../services/galleryService";
import tabCache from "../../services/tabCache";
import SubfolderCards from "./SubfolderCards";

const GalleryMain = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [imagesBySubfolder, setImagesBySubfolder] = useState({});
  const [loading, setLoading] = useState(false);
  const { getPreloadedData } = usePagePreloaderContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const initializeGallery = async () => {
      // Always show loading indicator briefly, even for cached data
      setLoading(true);
      
      // Try to use preloaded data first
      const preloadedData = getPreloadedData("gallery");
      
      if (preloadedData) {
        // Show brief loading for cached data (minimum 300ms for better UX)
        const startTime = Date.now();
        
        setTabs(preloadedData.tabs);
        setActiveTab(preloadedData.activeTab);
        setSubfolders(preloadedData.subfolders);
        setImagesBySubfolder(preloadedData.imagesBySubfolder);
        
        // Ensure minimum loading time for visual feedback
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 300 - elapsedTime);
        
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      } else {
        // Fallback: fetch data if not preloaded
        try {
          const galleryData = await fetchGalleryData();
          setTabs(galleryData.tabs);
          setActiveTab(galleryData.activeTab);
          setSubfolders(galleryData.subfolders);
          setImagesBySubfolder(galleryData.imagesBySubfolder);
        } catch (error) {
          console.error("Failed to load gallery data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    initializeGallery();
  }, [getPreloadedData]);

  // Handle tab switching with caching
  const handleTabChange = async (tabName) => {
    if (tabName === activeTab) return;
    
    setActiveTab(tabName);
    
    // Check cache first
    const cachedData = tabCache.get(tabName);
    if (cachedData) {
      // Use cached data immediately
      setSubfolders(cachedData.subfolders);
      setImagesBySubfolder(cachedData.imagesBySubfolder);
      
      // Brief loading for visual feedback
      setLoading(true);
      setTimeout(() => setLoading(false), 50);
      
      // Fetch fresh data in background
      setTimeout(async () => {
        try {
          const freshData = await fetchTabData(tabs, tabName);
          tabCache.set(tabName, freshData.subfolders, freshData.imagesBySubfolder);
          
          // Update UI if data changed
          const dataChanged = JSON.stringify(cachedData.imagesBySubfolder) !== JSON.stringify(freshData.imagesBySubfolder);
          if (dataChanged) {
            setSubfolders(freshData.subfolders);
            setImagesBySubfolder(freshData.imagesBySubfolder);
          }
        } catch (error) {
          console.error("Background refresh failed:", error);
        }
      }, 100);
    } else {
      // No cache: fetch normally
      setLoading(true);
      try {
        const tabData = await fetchTabData(tabs, tabName);
        setSubfolders(tabData.subfolders);
        setImagesBySubfolder(tabData.imagesBySubfolder);
        
        // Cache the data
        tabCache.set(tabName, tabData.subfolders, tabData.imagesBySubfolder);
      } catch (error) {
        console.error("Failed to load tab data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full relative">
        <SplideGalleryBanner />
      </div>
      <div className="min-h-screen">
        {/* Tabs here */}
        {tabs.length > 0 && (
          <div className="relative px-6 md:px-10 py-10 flex justify-start border-b-0 border-borderColor">
            <div className="flex gap-x-12 z-10 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-1 pb-1 transition-all uppercase duration-300 tracking-wider font-barlow border-b hover:border-borderColor hover:text-mainText text-base truncate max-w-xs mb-4 ${
                    activeTab === tab.name
                      ? "text-mainText border-borderColor"
                      : "border-transparent text-gray-400"
                  }`}
                  onClick={() => handleTabChange(tab.name)}
                  title={tab.name}
                >
                  {tab.name.charAt(0).toUpperCase() +
                    tab.name.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}
        <SubfolderCards
          loading={loading}
          subfolders={subfolders}
          imagesBySubfolder={imagesBySubfolder}
        />
      </div>
    </div>
  );
};

export default GalleryMain;
