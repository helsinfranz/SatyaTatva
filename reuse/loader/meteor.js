import classes from "./meteor.module.css";

export default function MeteorLoader() {
  return (
    <div className={classes.meteorHolder}>
      <div className={classes.meteor}></div>
    </div>
  );
}
