import classes from "./header.module.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (searchOpen) {
      document.getElementById("search").focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (optionsOpen) {
      document.querySelector("main").classList.add("shift-left");
    } else {
      document.querySelector("main").classList.remove("shift-left");
    }
  }, [optionsOpen]);
  return (
    <>
      <div className={classes.header}>
        <div
          className={`${classes.search} hover`}
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <IoSearch />
        </div>
        <div className={classes.mainHeader}>
          <nav className={classes.container}>
            <ul className={classes.navLinks}>
              <li>
                <Link
                  href="/"
                  className={pathname === "/" ? classes.selectedLink : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={
                    pathname === "/services" ? classes.selectedLink : ""
                  }
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={
                    pathname === "/pricing" ? classes.selectedLink : ""
                  }
                >
                  Pricing
                </Link>
              </li>
            </ul>
            <div className={classes.logo}>
              <Link href="#">
                <Image
                  src="/images/decex_black.png"
                  alt="Logo"
                  width={150}
                  height={30}
                  priority={true}
                />
              </Link>
            </div>
            <div className={classes.burger_drawer}>
              <label className={classes.hamburger}>
                <input type="checkbox" id="drawer" />
                <svg viewBox="0 0 32 32">
                  <path
                    className={`${classes.line} ${classes.lineTopBottom}`}
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  ></path>
                  <path className={classes.line} d="M7 16 27 16"></path>
                </svg>
              </label>
            </div>
            <ul className={classes.navLinks}>
              <li>
                <Link
                  href="/about"
                  className={pathname === "/about" ? classes.selectedLink : ""}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={
                    pathname.includes("/forms") ? classes.selectedLink : ""
                  }
                >
                  Forms
                </Link>
                <div className={classes.hover_container}>
                  <div className={classes.hover_links}>
                    <div>
                      <Link href="/forms/status_ad">Ad Status</Link>
                    </div>
                    <div>
                      <Link href="/forms/create_ad">Publish Ad</Link>
                    </div>
                    <div>
                      <Link href="/forms/new_name">Buy Custom Name</Link>
                    </div>
                    <div>
                      <Link href="/forms/buyavax">Buy AVAX</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="#"
                  className={
                    pathname.includes("/docs") ? classes.selectedLink : ""
                  }
                >
                  Docs
                </Link>
                <div className={classes.hover_container}>
                  <div className={classes.hover_links}>
                    <div>
                      <Link href="/docs/terms">Terms of Service</Link>
                    </div>
                    <div>
                      <Link href="/docs/privacy">Privacy Policy</Link>
                    </div>
                    <div>
                      <Link href="/docs/cookie">Cookie Policy</Link>
                    </div>
                    <div>
                      <Link href="/docs/ads">Ads info</Link>
                    </div>
                    <div>
                      <Link href="/docs/decencrypt">Decencrypt</Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={`${classes.options} hover`}
          onClick={() => setoptionsOpen(!optionsOpen)}
        >
          <HiMiniEllipsisHorizontal />
        </div>
      </div>
      <div
        className={`${classes.searchMain} ${
          searchOpen ? classes.searchOpen : ""
        }`}
      >
        <label className={`${classes.searhBar} hover`} htmlFor="search">
          <input
            id="search"
            type="text"
            placeholder="Search the site..."
            autoFocus={true}
          />
          <IoSearch />
        </label>
        <div
          className={`${classes.searchClose} hover`}
          onClick={() => setSearchOpen(false)}
        >
          <IoClose />
        </div>
      </div>
      <div
        className={`${classes.headerOptions} ${
          optionsOpen ? classes.optionsOpened : ""
        }`}
        onClick={() => setoptionsOpen(false)}
      >
        <div
          className={classes.optionsMain}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={classes.option}>
            <div className={classes.optionImage}>
              <Image
                src="/self.jpg"
                alt="user profile"
                width={150}
                height={150}
              />
            </div>
            <div className={classes.optionDetails}>
              <h2 className={classes.optionName}>Himanshu Rawat</h2>
              <div className={classes.optionDescription}>Founding Owner</div>
            </div>
          </div>
          <div className={classes.option2}>
            <h1 className={classes.optionMainTitle}>Useful Links</h1>
            <div className={classes.optionMainLinks}>
              <div className={`${classes.optionMainLink} hover`}>
                About Eternal
              </div>
              <div className={`${classes.optionMainLink} hover`}>
                Our Services
              </div>
              <div className={`${classes.optionMainLink} hover`}>
                Testimonials
              </div>
              <div className={`${classes.optionMainLink} hover`}>
                News &amp; Stories
              </div>
              <div className={`${classes.optionMainLink} hover`}>
                Get in Touch
              </div>
            </div>
          </div>
          <div
            className={`${classes.extra} ${
              optionsOpen ? classes.extraOpen : ""
            } hover`}
            onClick={() => setoptionsOpen(false)}
          >
            <IoIosCloseCircleOutline />
            CLOSE BAR
          </div>
        </div>
      </div>
    </>
  );
}
