import classes from "./blackHole.module.css";

export default function BlackHole() {
  return (
    <div className={classes.loader}>
      <div className={classes.blackhole}>
        <div className={classes.blackholeCircle}></div>
        <div className={classes.blackholeDisc}></div>
      </div>
    </div>
  );
}
