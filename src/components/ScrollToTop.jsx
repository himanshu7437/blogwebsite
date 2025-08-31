import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantly to the top when route changes
    window.scrollTo(0, 0);

    // 👇 If you want smooth scroll instead:
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
