import classes from "./planet1.module.css";

export default function Planet1() {
  return (
    <div className={classes.content}>
      <div className={classes.planet}>
        <div className={classes.ring}></div>
        <div className={classes.coverRing}></div>
        <div className={classes.spots}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
