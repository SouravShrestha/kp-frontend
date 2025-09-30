export const createPageNavigationHandler = (preloadPageData, navigate) => {
  return async (e, href, pageName) => {
    e.preventDefault();
    try {
      await preloadPageData(pageName);
      navigate(href);
    } catch (error) {
      // Navigate anyway if preloading fails - error already logged by preloader
      navigate(href);
    }
  };
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};