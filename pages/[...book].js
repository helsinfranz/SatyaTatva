import classes from "@/styles/book.module.css";
import Image from "next/image";

export default function Book() {
  return (
    <div className={classes.container}>
      <div className={classes.topHero}>
        <div className={classes.heroImage}>
          <Image
            src="/testingHero.jpg"
            alt="Picture of the author"
            width={1200}
            height={500}
          />
        </div>
        <div className={classes.heroText}>
          <h1>Skhand Padhbb</h1>
          <p>Basic Understanding</p>
        </div>
      </div>
      <div className={classes.main}></div>
    </div>
  );
}
