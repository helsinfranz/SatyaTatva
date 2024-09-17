import { useRouter } from "next/router";
import classes from "@/styles/shlok.module.css";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoPause } from "react-icons/io5";

export default function Shlok() {
  const router = useRouter();
  const slug = router.query.slug;
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
        <div className={classes.smallTitle}>Shlok</div>
        <div className={classes.smallDetail}>{slug}</div>
      </div>
      <div className={classes.shlokSlider}>
        <div className={`${classes.shlokSliderMain} hover`}>
          <IoIosArrowBack />
        </div>
        <div className={`${classes.shlokSliderMain} hover`}>
          <IoPause />
        </div>
        <div className={`${classes.shlokSliderMain} hover`}>
          <IoIosArrowForward />
        </div>
      </div>
      <div className={classes.shlokSettings}>Shlok - {slug}</div>
    </div>
  );
}
