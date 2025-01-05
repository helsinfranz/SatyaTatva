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

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);
  return (
    <>
      {!isSmallScreen && !isMouseOffScreen && !isSeachOpened && <Cursor />}
      <main className={classes.main}>
        {!pathname?.includes("book") && <Header setIsSeachOpened={setIsSeachOpened} />}
        {children}
        {!pathname?.includes("book") && <Footer />}
      </main>
    </>
  );
}
