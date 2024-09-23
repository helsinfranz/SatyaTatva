import classes from "./header.module.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSecDrawer, setShowSecDrawer] = useState(0);
  const [showNavs, setShowNavs] = useState(false);
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
    setShowNavs(!showNavs);
  }, [optionsOpen]);

  function toggleDrawer() {
    setShowDrawer(!showDrawer);
    setShowSecDrawer(null);
  }

  function routeSelect() {
    setShowDrawer(false);
    document.getElementById("drawer").click();
  }
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
            <ul className={classes.navLinks}>
              <li>
                <Link
                  href="/blog"
                  className={pathname === "/blog" ? classes.selectedLink : ""}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={
                    pathname?.includes("/forms") ? classes.selectedLink : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
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
                    pathname?.includes("/docs") ? classes.selectedLink : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
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
        <div className={classes.mainOptionHeader}>
          {!showDrawer && (
            <div
              className={`${classes.options} hover`}
              onClick={() => setoptionsOpen(!optionsOpen)}
            >
              <HiMiniEllipsisHorizontal />
            </div>
          )}
          <div
            className={`${classes.smallOption} hover`}
            onClick={() => setoptionsOpen(!optionsOpen)}
          >
            <MdKeyboardArrowLeft />
          </div>
          <div className={classes.burger_drawer}>
            <label className={classes.hamburger}>
              <input type="checkbox" onChange={toggleDrawer} id="drawer" />
              <svg viewBox="0 0 32 32">
                <path
                  className={`${classes.line} ${classes.lineTopBottom}`}
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className={classes.line} d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
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
      {showNavs && (
        <>
          <div
            className={`${classes.burger_main} ${
              showDrawer ? classes.comeout_animation : ""
            }`}
          >
            <Link
              className={`${classes.burger_option} ${
                pathname === "/" ? classes.option_selected : ""
              }`}
              href="/"
              onClick={routeSelect}
            >
              Home
            </Link>
            <Link
              className={`${classes.burger_option} ${
                pathname === "/services" ? classes.option_selected : ""
              }`}
              href="/services"
              onClick={routeSelect}
            >
              Services
            </Link>
            <Link
              className={`${classes.burger_option} ${
                pathname === "/pricing" ? classes.option_selected : ""
              }`}
              href="/pricing"
              onClick={routeSelect}
            >
              Pricing
            </Link>
            <Link
              className={`${classes.burger_option} ${
                pathname === "/blog" ? classes.option_selected : ""
              }`}
              href="/blog"
              onClick={routeSelect}
            >
              Blogs
            </Link>
            <Link
              className={`${classes.burger_option} ${
                pathname?.includes("/forms") ? classes.option_selected : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(1);
              }}
            >
              Forms
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
              </svg>
            </Link>
            <Link
              className={`${classes.burger_option} ${
                pathname?.includes("/docs") ? classes.option_selected : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(2);
              }}
            >
              Docs
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
              </svg>
            </Link>
          </div>
          <div
            className={`${classes.burger_main} ${
              showSecDrawer === 1 ? classes.comeout_animation1 : ""
            }`}
          >
            <Link
              className={classes.burger_option_back}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(0);
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
              </svg>
              Forms
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/forms/status_ad"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/forms/status_ad"
            >
              Ad Status
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/forms/create_ad"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/forms/create_ad"
            >
              Publish Ad
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/forms/new_name"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/forms/new_name"
            >
              Buy Custom Name
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/forms/buyavax"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/forms/buyavax"
            >
              Buy AVAX
            </Link>
          </div>
          <div
            className={`${classes.burger_main} ${
              showSecDrawer === 2 ? classes.comeout_animation1 : ""
            }`}
          >
            <Link
              className={classes.burger_option_back}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(0);
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
              </svg>
              Docs
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/docs/terms" ? classes.option_selected_small : ""
              }`}
              href="/docs/terms"
            >
              Terms of Service
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/docs/privacy"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/docs/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/docs/cookie" ? classes.option_selected_small : ""
              }`}
              href="/docs/cookie"
            >
              Cookie Policy
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/docs/ads" ? classes.option_selected_small : ""
              }`}
              href="/docs/ads"
            >
              Ads info
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/docs/decencrypt"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/docs/decencrypt"
            >
              Decencrypt
            </Link>
          </div>
        </>
      )}
    </>
  );
}
