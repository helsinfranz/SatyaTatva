import Image from "next/image";
import Link from "next/link";
import classes from "./footerMain.module.css";
import { FaAt, FaFacebookF, FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { IoMail } from "react-icons/io5";

export default function FooterMain() {
  return (
    <div className={classes.footerSite}>
      <div className={classes.footerSiteDetails}>
        <div className={classes.footerSiteDetailsLogo}>
          <Link href="/">
            <Image
              src="/logos/SatyaTatva_FI_NB.png"
              alt="Logo"
              width={50}
              height={50}
              priority={true}
            />
          </Link>
        </div>
        <div className={classes.footerSiteDetailsText}>
          Satya Tatva is an open source and non profit organization located in
          Bharat.
        </div>
        <div className={classes.footerSiteDetailsText}>
          We provide a wide range of books, shloks, blogs and stories related to
          Sanatana Dharma.
        </div>
        <div className={classes.footerSiteDetailsText}>
          We are driven by our users and community. We are always open to
          bringing new ideas and suggestions.
        </div>
      </div>
      <div className={classes.footerSiteLinks}>
        <div className={classes.footerSiteLinksTitle}>Useful Links</div>
        <div className={classes.footerSiteLinksMain}>
          <Link className={classes.footerSiteLink} href="/about">
            About Eternals
          </Link>
          <Link className={classes.footerSiteLink} href="/services">
            Our Services
          </Link>
          <Link className={classes.footerSiteLink} href="/support">
            Support
          </Link>
          <Link className={classes.footerSiteLink} href="/blog">
            Blogs & Stories
          </Link>
          <Link
            className={classes.footerSiteLink}
            href="mailto:satyatatva108@gmail.com"
          >
            Get in Touch
          </Link>
        </div>
      </div>
      <div className={classes.footerSiteLinks}>
        <div className={classes.footerSiteLinksTitle}>Explore Content</div>
        <div className={classes.footerSiteLinksMain}>
          <Link className={classes.footerSiteLink} href="/veda/rig">
            Rig Veda
          </Link>
          <Link className={classes.footerSiteLink} href="/purana/hindi">
            Purana in Hindi
          </Link>
          <Link className={classes.footerSiteLink} href="/purana/english">
            Purana in English
          </Link>
          <Link className={classes.footerSiteLink} href="/others/shloks">
            Shloks
          </Link>
          <Link className={classes.footerSiteLink} href="/others/books">
            Extra Books
          </Link>
        </div>
      </div>
      <div className={classes.footerSiteSocials}>
        <div className={classes.footerSiteLinksTitle}>How To Find Us</div>
        <div className={classes.footerSiteSocialMain}>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <ImLocation2 />
            </div>
            Uttarakhand, Bharat
          </div>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <IoMail />
            </div>
            satyatatva108@gmail.com
          </div>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <FaGithub />
            </div>
            github.com/helsinfranz/eternal
          </div>
          <div className={classes.footerSiteSocialSingle}>
            <div className={classes.footerSiteSocialSvg}>
              <FaAt />
            </div>
            <div className={classes.socials}>
              <Link
                className={classes.socialLinks}
                href="https://www.facebook.com/people/Satya-Tatva/61572392306279/"
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
                href="https://www.linkedin.com/company/satyatatva"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                className={classes.socialLinks}
                href="https://www.youtube.com/@SatyaTatva108"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </Link>
              <Link
                className={classes.socialLinks}
                href="https://www.instagram.com/satyatatva108/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
