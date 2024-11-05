import { useRouter } from "next/router";
import classes from "@/styles/shlok.module.css";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoPause } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getShlokas } from "@/Books_PDFs/Shlok/others-shloks.js";

export default function Shlok() {
  const router = useRouter();
  const slug = router.query.slug;
  const [shlok, setShlok] = useState(null);
  const [shlokNo, setShlokNo] = useState(0);

  useEffect(() => {
    if (slug) {
      setShlok(getShlokas(slug));
      setShlokNo(1);
    }
  }, [slug]);
  return (
    <div className={classes.container}>
      <Image
        src="/testingHero.jpg"
        alt="Picture of the author"
        fill={true}
        priority={true}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div className={classes.shlokMain}>
        <div className={classes.smallTitle}>
          {shlokNo > 0 && shlok
            ? shlok[`shlok${shlokNo}`].split("\n\n")[0]
            : "Shlok"}
        </div>
        <div className={classes.smallDetail}>
          {shlokNo > 0 ? shlok[`shlok${shlokNo}`].split("\n\n")[1] : slug}
        </div>
      </div>
      <div className={classes.shlokSlider}>
        <div
          className={`${classes.shlokSliderMain} hover`}
          onClick={() => {
            if (shlokNo > 1) setShlokNo((prev) => prev - 1);
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className={`${classes.shlokSliderMain} hover`}>
          <IoPause />
        </div>
        <div
          className={`${classes.shlokSliderMain} hover`}
          onClick={() => {
            if (shlokNo < Object.keys(shlok).length)
              setShlokNo((prev) => prev + 1);
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div className={classes.shlokSettings}>Shlok - {slug}</div>
    </div>
  );
}
