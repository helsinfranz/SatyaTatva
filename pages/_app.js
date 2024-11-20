import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (!localStorage.getItem("mostRecent")) {
      localStorage.setItem(
        "mostRecent",
        JSON.stringify([
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
        ])
      );
    }
    if (!localStorage.getItem("mostVisited")) {
      localStorage.setItem(
        "mostVisited",
        JSON.stringify([
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
        ])
      );
    }
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
