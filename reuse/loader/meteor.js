import classes from "./meteor.module.css";

export default function MeteorLoader({ styles }) {
  return (
    <div className={classes.meteorHolder} style={styles ? styles : {}}>
      <div className={classes.meteor}></div>
    </div>
  );
}
