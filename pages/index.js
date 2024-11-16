import Head from "next/head";
import classes from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
              <Link className={classes.quoteSmall} key={idx} href={item.link}>
                <div className={classes.quoteImage}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill={true}
                    priority={true}
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
                <div className={classes.smallDetails}>
                  <div className={classes.smallTitle}>{item.name}</div>
                  <div className={classes.smallDetail}>{item.detail}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={classes.mostVisited}>
          {mostVisited.map((item, idx) => (
            <Link
              className={`${classes.mostVisitedSingle} hover`}
              key={idx}
              href={item.link}
              onClick={(e) => {
                if (!enable) {
                  e.preventDefault();
                }
              }}
            >
              <div className={classes.cubeImage}>
                <Image
                  src={item.img}
                  alt={item.name}
                  fill={true}
                  priority={true}
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className={classes.smallDetails}>
                <div className={classes.smallTitle}>{item.name}</div>
                <div className={classes.smallDetail}>{item.detail}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
