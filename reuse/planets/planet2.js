import classes from "./planet2.module.css";

export default function Planet2() {
  return (
    <div className={classes.main}>
      <div className={classes.rings} id="ring1"></div>
      <div className={classes.rings} id="ring2"></div>
      <div className={classes.asteriodsLarge} id="asteriod1"></div>
      <div className={classes.asteriodsLarge} id="asteriod2"></div>
      <div className={classes.asteriodsLarge} id="asteriod3"></div>
      <div className={classes.asteriodsLarge} id="asteriod4"></div>
      <div className={classes.asteriodsLarge} id="asteriod5"></div>
      <div className={classes.asteriodsSmall} id="asteriod6"></div>
      <div className={classes.asteriodsSmall} id="asteriod7"></div>
      <div className={classes.asteriodsSmall} id="asteriod8"></div>
      <div className={classes.asteriodsSmall} id="asteriod9"></div>
      <div className={classes.asteriodsSmall} id="asteriod10"></div>
      <div id="saturn"></div>
    </div>
  );
}
