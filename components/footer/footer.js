import classes from "./footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>Copyright © 2022</div>
      <div className={classes.socials}>
        <a className={classes.socialLinks} href="/">
          <FaFacebookF />
        </a>
        <a className={classes.socialLinks}>
          <FaTwitter />
        </a>
        <a className={classes.socialLinks}>
          <FaLinkedinIn />
        </a>
        <a className={classes.socialLinks}>
          <FaYoutube />
        </a>
        <a className={classes.socialLinks}>
          <AiFillInstagram />
        </a>
      </div>
    </div>
  );
}
