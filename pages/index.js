import Head from "next/head";
import classes from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
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
    const mostRecent = JSON.parse(localStorage.getItem("mostRecent")) || [
      {
        name: "श्री हनुमान चालीसा",
        detail: "Shri Hanuman Chalisa",
        img: "/banners/hanuman_chalisa.webp",
        link: "/shlok/others-hanuman-chalisa",
      },
      {
        name: "शिव तांडव स्तोत्र",
        detail: "Shiv Tandav Stotram",
        img: "/banners/shiv_tandav_strotam.jpg",
        link: "/shlok/others-shiv-tandav-stotram",
      },
    ];
    const mostVisited = JSON.parse(localStorage.getItem("mostVisited")) || [
      {
        name: "Mahabharata",
        detail: "Mahabharata in English",
        img: "/banners/mahabharat.png",
        link: "/book/others-mahabharata-english",
      },
      {
        name: "Ramayan",
        detail: "Ramayan in English",
        img: "/banners/ramayana.jpg",
        link: "/book/others-ramayan-english",
      },
      {
        name: "श्री हनुमान चालीसा",
        detail: "Shri Hanuman Chalisa",
        img: "/banners/hanuman_chalisa.webp",
        link: "/shlok/others-hanuman-chalisa",
      },
      {
        name: "शिव तांडव स्तोत्र",
        detail: "Shiv Tandav Stotram",
        img: "/banners/shiv_tandav_strotam.jpg",
        link: "/shlok/others-shiv-tandav-stotram",
      },
      {
        name: "Shri Ramcharitmanas",
        detail: "Shri Ramcharitmanas in English",
        img: "/banners/ramcharitmanas.jpg",
        link: "/book/others-shri-ramcharitmanas-english",
      },
      {
        name: "Shrimad Bhagwat Geeta",
        detail: "Shrimad Bhagwat Geeta in English",
        img: "/banners/bhagavad_gita.jpg",
        link: "/book/others-bhagavad-gita-english",
      },
    ];
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
