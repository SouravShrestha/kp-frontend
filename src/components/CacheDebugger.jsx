import { useState, useEffect } from "react";
import { usePagePreloaderContext } from "../contexts/PagePreloaderContext";

const CacheDebugger = () => {
  const [showDebug, setShowDebug] = useState(false);
  const [cacheInfo, setCacheInfo] = useState({});
  const { getCacheInfo, clearCache, refreshCache, CACHE_DURATION } = usePagePreloaderContext();

  useEffect(() => {
    if (showDebug) {
      const updateCacheInfo = () => {
        setCacheInfo(getCacheInfo());
      };
      
      updateCacheInfo();
      const interval = setInterval(updateCacheInfo, 1000);
      
      return () => clearInterval(interval);
    }
  }, [showDebug, getCacheInfo]);

  const handleClearAll = () => {
    clearCache();
    setCacheInfo({});
  };

  const handleRefreshPage = async (pageName) => {
    await refreshCache(pageName);
    setCacheInfo(getCacheInfo());
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
      >
        {showDebug ? 'Hide' : 'Show'} Cache Debug
      </button>
      
      {showDebug && (
        <div className="mt-2 bg-black text-white p-3 rounded max-w-sm text-xs overflow-auto max-h-60">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Cache Status</h3>
            <button
              onClick={handleClearAll}
              className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs"
            >
              Clear All
            </button>
          </div>
          
          <div className="mb-2 text-gray-300">
            Cache Duration: {Math.floor(CACHE_DURATION / 60000)} minutes
          </div>
          
          {Object.keys(cacheInfo).length === 0 ? (
            <p className="text-gray-400">No cached data</p>
          ) : (
            Object.entries(cacheInfo).map(([key, info]) => {
              const pageName = key.replace('page_', '');
              return (
                <div key={key} className="mb-3 border-b border-gray-600 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold capitalize">{pageName}</div>
                    <button
                      onClick={() => handleRefreshPage(pageName)}
                      className="bg-green-500 hover:bg-green-600 px-1 py-0.5 rounded text-xs"
                    >
                      Refresh
                    </button>
                  </div>
                  <div className={`text-xs ${info.expired ? 'text-red-400' : 'text-green-400'}`}>
                    Age: {info.age}s | Left: {info.timeLeft}s
                  </div>
                  <div className="text-gray-300 text-xs">
                    Size: {(info.size / 1024).toFixed(1)}KB
                  </div>
                  <div className="text-blue-300 text-xs">
                    Last used: {info.lastAccessed}s ago
                  </div>
                  {info.expired && (
                    <div className="text-red-400 text-xs font-bold">EXPIRED</div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CacheDebugger;