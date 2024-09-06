import Head from "next/head";
import classes from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Eternal - Home</title>
        <meta name="description" content="Home of Eternals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${classes.container} scrollable`}>
        <div className={classes.topHero}>
          <div className={classes.quote}>
            <div className={classes.quoteTitle}>Quote of the day</div>
            <div className={classes.quoteMain}>
              Do this as it the main thing. Do this as it the main thing. Do
              this as it the main thing. Do this as it the main thing.
            </div>
          </div>
          <div className={classes.quoteOther}>
            <div className={classes.quoteSmall}></div>
            <div className={classes.quoteSmall}></div>
          </div>
        </div>
        <div className={classes.mostVisited}>
          <div className={classes.mostVisitedSingle}></div>
          <div className={classes.mostVisitedSingle}></div>
          <div className={classes.mostVisitedSingle}></div>
          <div className={classes.mostVisitedSingle}></div>
        </div>
      </div>
    </>
  );
}
