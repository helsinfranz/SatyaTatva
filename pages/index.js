import Head from "next/head";
import classes from "@/styles/Home.module.css";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [quote, setQuote] = useState(
    "Do this as it the main thing. Do this as it the main thing. Do this as it the main thing. Do this as it the main thing"
  );
  const [mostRecent, setMostRecent] = useState([
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
  ]);
  const [mostVisited, setMostVisited] = useState([
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
    {
      name: "Skhand Padhbb",
      link: "/padhbb/skandh",
      detail: "This is a skhand padhbb.",
      img: "/testing.jpg",
    },
  ]);

  const containerRef = useRef(null);

  function scollAround(e) {
    e.preventDefault();
    e.stopPropagation();

    const container = containerRef.current;
    const startX = e.pageX;
    const scrollLeft = container.scrollLeft;

    const handleScrollMouseMove = (e) => {
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
                    quality={1}
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
            >
              <div className={classes.cubeImage}>
                <Image
                  src={item.img}
                  alt={item.name}
                  fill={true}
                  priority={true}
                  quality={1}
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
