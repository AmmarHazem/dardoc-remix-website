import { useEffect, useState } from "react";

const mobileWidth = 648;

function useWindowSize(params?: { listenForResize?: boolean }) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isMobile: true,
  });

  const listenForResize = params?.listenForResize ?? true;

  useEffect(() => {
    if (!window) return;
    function handleResize() {
      const width = window?.innerWidth ?? 0;
      setWindowSize({
        width: width,
        height: window?.innerHeight ?? 0,
        isMobile: width <= mobileWidth,
      });
    }
    handleResize();
    if (listenForResize) {
      window?.addEventListener("resize", handleResize);
    }
    return () => {
      if (listenForResize) {
        window?.removeEventListener("resize", handleResize);
      }
    };
  }, [listenForResize]);

  return windowSize;
}

export default useWindowSize;
