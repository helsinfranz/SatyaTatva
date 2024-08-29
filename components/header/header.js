import classes from "./header.module.css";

export default function Header() {
  return (
    // <div className={classes.header}>
    //   <h1>Header</h1>
    // </div>

    <div className={classes.footer}>
      <div className={classes.copyright}>Copyright © 2022</div>
      <div className={classes.socials}>
        <div className={classes.socialLinks}>a</div>
        <div className={classes.socialLinks}>b</div>
        <div className={classes.socialLinks}>c</div>
        <div className={classes.socialLinks}>d</div>
        <div className={classes.socialLinks}>e</div>
      </div>
    </div>
  );
}
