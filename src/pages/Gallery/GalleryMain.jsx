import SplideGalleryBanner from "./SplideGalleryBanner";
import { useEffect, useState } from "react";
import { fetchSubfoldersByName, fetchSubfoldersById } from "../../apis/gallery";
import { fetchCloudinaryImagesById } from "../../apis/cloudinary";
import SubfolderCards from "./SubfolderCards";

const GalleryMain = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [imagesBySubfolder, setImagesBySubfolder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchSubfoldersByName("kp-gallery").then((folders) => {
      setTabs(folders);
      if (folders.length > 0) setActiveTab(folders[0].name);
    });
  }, []);

  useEffect(() => {
    const tabObj = tabs.find((t) => t.name === activeTab);
    if (!tabObj) return;
    setLoading(true);
    fetchSubfoldersById(tabObj.id).then((subs) => {
      setSubfolders(subs);
      Promise.all(
        subs.map(async (sf) => {
          const images = await fetchCloudinaryImagesById(sf.id);
          return { id: sf.id, images };
        })
      ).then((results) => {
        const imgMap = {};
        results.forEach(({ id, images }) => {
          imgMap[id] = images;
        });
        console.log(imgMap);
        setImagesBySubfolder(imgMap);
        setLoading(false);
      });
    });
  }, [activeTab, tabs]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full relative">
        <SplideGalleryBanner />
      </div>
      <div className="min-h-screen">
        {/* Tabs here */}
        {tabs.length > 0 && (
          <div className="relative px-6 md:px-10 py-10 flex justify-start border-b-0 border-mainText">
            <div className="flex gap-x-12 z-10 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-1 pb-1 transition-all uppercase duration-300 tracking-wider font-barlow border-b hover:border-mainText hover:text-mainText text-base truncate max-w-xs mb-4 ${
                    activeTab === tab.name
                      ? "text-mainText border-mainText"
                      : "border-transparent text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab.name)}
                  title={tab.name}
                >
                  {tab.name.charAt(0).toUpperCase() +
                    tab.name.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Subfolder cards */}
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
