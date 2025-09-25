import { createContext, useContext, useEffect } from "react";
import { useUniversalPagePreloader } from "../hooks/useUniversalPagePreloader";

const PagePreloaderContext = createContext();

export const usePagePreloaderContext = () => {
  const context = useContext(PagePreloaderContext);
  if (!context) {
    throw new Error("usePagePreloaderContext must be used within PagePreloaderProvider");
  }
  return context;
};

export const PagePreloaderProvider = ({ children }) => {
  const pagePreloader = useUniversalPagePreloader();
  
  // Clean up expired cache entries every 10 minutes (less frequent with longer cache)
  useEffect(() => {
    const interval = setInterval(() => {
      pagePreloader.cleanupExpiredCache();
    }, 10 * 60 * 1000); // 10 minutes
    
    return () => clearInterval(interval);
  }, [pagePreloader.cleanupExpiredCache]);
  
  return (
    <PagePreloaderContext.Provider value={pagePreloader}>
      {children}
    </PagePreloaderContext.Provider>
  );
};