import Head from "next/head";
import classes from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContentCube from "@/components/home/content_cube";
import SmallCube from "@/components/home/small_cube";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [mostRecent, setMostRecent] = useState([]);
  const [mostVisited, setMostVisited] = useState([]);
  const [enable, setEnable] = useState(true);
  const containerRef = useRef(null);

  function scollAround(e) {
    e.preventDefault();
    e.stopPropagation();
    setEnable(true);
    const container = containerRef.current;
    const startX = e.pageX;
    const scrollLeft = container.scrollLeft;

    const handleScrollMouseMove = (e) => {
      setEnable(false);
      const deltaX = e.pageX - startX;
      container.scrollLeft = scrollLeft - deltaX;
    };

    const handleScrollMouseUp = () => {
      window.removeEventListener("mousemove", handleScrollMouseMove);
      window.removeEventListener("mouseup", handleScrollMouseUp);
    };

    window.addEventListener("mousemove", handleScrollMouseMove);
    window.addEventListener("mouseup", handleScrollMouseUp);
  }

  useEffect(() => {
    const mostRecent = JSON.parse(localStorage.getItem("mostRecent")) || [];
    const mostVisited = JSON.parse(localStorage.getItem("mostVisited")) || [];
    setQuote(
      "Do this as it the main thing. Do this as it the main thing. Do this as it the main thing. Do this as it the main thing"
    );
    setMostRecent(mostRecent);
    setMostVisited(mostVisited);
  }, []);

  return (
    <>
      <Head>
        <title>Eternal - Home</title>
        <meta name="description" content="Home of Eternals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${classes.container} scrollable`}
        onMouseDown={scollAround}
        ref={containerRef}
      >
        <div className={classes.topHero}>
          <div className={classes.quote}>
            <div className={classes.quoteTitle}>Quote of the day</div>
            <div className={classes.quoteMain}>{quote}</div>
          </div>
          <div className={classes.quoteOther}>
            {mostRecent.map((item, idx) => (
              <SmallCube classes={classes} key={idx} item={item} />
            ))}
          </div>
        </div>
        <div className={classes.mostVisited}>
          {mostVisited.map((item, idx) => (
            <ContentCube
              classes={classes}
              key={idx}
              item={item}
              enable={enable}
            />
          ))}
        </div>
      </div>
    </>
  );
}
