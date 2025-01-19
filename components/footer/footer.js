import classes from "./footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>Copyright © 2025</div>
      <div className={classes.socials}>
        <Link
          className={classes.socialLinks}
          href="https://x.com/SatyaTatva108"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </Link>
        <Link
          className={classes.socialLinks}
          href="https://x.com/SatyaTatva108"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </Link>
        <Link
          className={classes.socialLinks}
          href="https://x.com/SatyaTatva108"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </Link>
        <Link
          className={classes.socialLinks}
          href="https://x.com/SatyaTatva108"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </Link>
        <Link
          className={classes.socialLinks}
          href="https://x.com/SatyaTatva108"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram />
        </Link>
      </div>
    </div>
  );
}
