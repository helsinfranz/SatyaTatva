import Image from "next/image";
import Link from "next/link";
import classes from "./footerMain.module.css";
import { FaFacebookF, FaShareAlt } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function FooterMain() {
  return (
    <div className={classes.footerSite}>
      <div className={classes.footerSiteDetails}>
        <div className={classes.footerSiteDetailsLogo}>
          <Link href="/">
            <Image
              src="/images/decex_black.png"
              alt="Logo"
              width={150}
              height={30}
              priority={true}
            />
          </Link>
        </div>
        <div className={classes.footerSiteDetailsText}>
          Alessa is a creative digital design agency located in San Francisco,
          California.
        </div>
        <div className={classes.footerSiteDetailsText}>
          We provide a wide range of services in concept design, web design,
          product design, branding, UX/UI design, and other creative stuff.
        </div>
        <div className={classes.footerSiteDetailsText}>
          We are a client-oriented company and are happy to help you with your
          ideas.
        </div>
      </div>
      <div className={classes.footerSiteLinks}>
        <div className={classes.footerSiteLinksTitle}>Useful Links</div>
        <div className={classes.footerSiteLinksMain}>
          <div className={`${`${classes.footerSiteLink} hover`} hover`}>
            About Studio
          </div>
          <div className={`${classes.footerSiteLink} hover`}>Our Services</div>
          <div className={`${classes.footerSiteLink} hover`}>Testimonials</div>
          <div className={`${classes.footerSiteLink} hover`}>
            News & Stories
          </div>
          <div className={`${classes.footerSiteLink} hover`}>Get in Touch</div>
        </div>
      </div>
      <div className={classes.footerSiteLinks}>
        <div className={classes.footerSiteLinksTitle}>Explore Works</div>
        <div className={classes.footerSiteLinksMain}>
          <div className={`${classes.footerSiteLink} hover`}>Art</div>
          <div className={`${classes.footerSiteLink} hover`}>Branding</div>
          <div className={`${classes.footerSiteLink} hover`}>Concept</div>
          <div className={`${classes.footerSiteLink} hover`}>Design</div>
          <div className={`${classes.footerSiteLink} hover`}>Photography</div>
        </div>
      </div>
      <div className={classes.footerSiteSocials}>
        <div className={classes.footerSiteLinksTitle}>How To Find Us</div>
        <div className={classes.footerSiteSocialMain}>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <FaShareAlt />
            </div>
            1800 11th Ave, CA 94122
          </div>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <FaShareAlt />
            </div>
            alessa@example.com
          </div>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <FaShareAlt />
            </div>
            +1 (234) 555 - 67 - 89
          </div>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <FaShareAlt />
            </div>
            <div className={classes.socials}>
              <Link className={classes.socialLinks} href="/">
                <FaFacebookF />
              </Link>
              <Link className={classes.socialLinks} href="/">
                <FaTwitter />
              </Link>
              <Link className={classes.socialLinks} href="/">
                <FaLinkedinIn />
              </Link>
              <Link className={classes.socialLinks} href="/">
                <FaYoutube />
              </Link>
              <Link className={classes.socialLinks} href="/">
                <AiFillInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
