import classes from "./progressBar.module.css";

export default function ProgressBar({ progress }) {
  return (
    <div className={classes.loader}>
      <div
        className={classes.loaderFill}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
