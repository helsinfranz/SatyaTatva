import Cursor from "@/components/cursor";
import classes from "./layout.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMouseOffScreen, setIsMouseOffScreen] = useState(false);
  const [isSeachOpened, setIsSeachOpened] = useState(false);
  const [isCursor, setIsCursor] = useState(false);
  const [language, setLanguage] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 48em)");
    const handleMediaChange = (event) => {
      setIsMouseOffScreen(false);
      setIsSmallScreen(event.matches);
    };

    const handleMouseLeave = () => {
      setIsMouseOffScreen(true);
    };

    const handleMouseEnter = () => {
      setIsMouseOffScreen(false);
    };

    setIsSmallScreen(mediaQuery.matches); // Initial check
    mediaQuery.addEventListener("change", handleMediaChange);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const value = localStorage.getItem("isCursor");
    if (value) {
      setIsCursor(JSON.parse(value));
    }
    const lang = navigator.language?.split("-")[0];
    setLanguage(lang === "hi");

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("isCursor", JSON.stringify(isCursor));
  }, [isCursor]);
  return (
    <>
      {!isSmallScreen && !isMouseOffScreen && !isSeachOpened && !isCursor && (
        <Cursor />
      )}
      <main className={classes.main}>
        {!pathname?.includes("book/") && !pathname?.includes("shlok/") && (
          <Header
            setIsSeachOpened={setIsSeachOpened}
            setIsCursor={setIsCursor}
            isCursor={isCursor}
            language={language}
          />
        )}
        {children}
        {!pathname?.includes("book/") && !pathname?.includes("shlok/") && (
          <Footer />
        )}
      </main>
    </>
  );
}
