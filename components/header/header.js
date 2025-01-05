import classes from "./header.module.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSearchResults } from "@/lib/storage";

export default function Header({ setIsSeachOpened }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSecDrawer, setShowSecDrawer] = useState(0);
  const [showNavs, setShowNavs] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const pathname = usePathname();
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      document.getElementById("search").focus();
    }
    setIsSeachOpened(searchOpen);
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

  function routeSelectSmall() {
    setShowSecDrawer(0);
    routeSelect();
  }

  function searchSite() {
    if (searchRef.current) {
      const search = searchRef.current.value;
      if (search) {
        if (search.length < 3) {
          setSearchResult({});
          return;
        }
        const results = getSearchResults(search);
        setSearchResult(results || {});
      }
    }
  }

  function closeSearch() {
    setSearchOpen(false);

    if (searchRef.current) {
      searchRef.current.value = "";
    }
  }
  return (
    <>
      <div className={classes.header}>
        <div
          className={`${classes.search} hover`}
          onClick={() => setSearchOpen((prev) => !prev)}
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
                    pathname?.includes("/veda") ? classes.selectedLink : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Veda
                </Link>
                <div className={classes.hover_container}>
                  <div className={classes.hover_links}>
                    <div>
                      <Link href="/veda/rig">Rig Veda</Link>
                    </div>
                    <div>
                      <Link href="/veda/yajur">Yajur Veda</Link>
                    </div>
                    <div>
                      <Link href="/veda/sam">Sam Veda</Link>
                    </div>
                    <div>
                      <Link href="/veda/atharv">Atharv Veda</Link>
                    </div>
                  </div>
                </div>
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
                  href="#"
                  className={
                    pathname?.includes("/purana") ? classes.selectedLink : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Purana
                </Link>
                <div className={classes.hover_container}>
                  <div className={classes.hover_links}>
                    <div>
                      <Link href="/purana/hindi">Purana in Hindi</Link>
                    </div>
                    <div>
                      <Link href="/purana/english">Purana in English</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="#"
                  className={
                    pathname?.includes("/upanishad") ? classes.selectedLink : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Upanishad
                </Link>
                <div className={classes.hover_container}>
                  <div className={classes.hover_links}>
                    <div>
                      <Link href="/upanishad/hindi">Upanishad in Hindi</Link>
                    </div>
                    <div>
                      <Link href="/upanishad/english">
                        Upanishad in English
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="#"
                  className={
                    pathname?.includes("/others") ? classes.selectedLink : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Others
                </Link>
                <div className={classes.hover_container}>
                  <div className={classes.hover_links}>
                    <div>
                      <Link href="/others/shloks">Shloks</Link>
                    </div>
                    <div>
                      <Link href="/others/books">Books</Link>
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
            ref={searchRef}
            onChange={searchSite}
          />
          <IoSearch />
          {Object.keys(searchResult).length > 0 && (
            <div className={classes.searchResult}>
              <div className={classes.searchResultItem}>
                {Object.keys(searchResult).map((key) => (
                  <Link key={key} href={`/book/${searchResult[key]}`}>
                    {key}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </label>
        <div className={`${classes.searchClose} hover`} onClick={closeSearch}>
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
              <Link className={`${classes.optionMainLink} hover`} href={"/"}>
                About Eternal
              </Link>
              <Link
                className={`${classes.optionMainLink} hover`}
                href={"/services"}
              >
                Our Services
              </Link>
              <Link
                className={`${classes.optionMainLink} hover`}
                href={"/support"}
              >
                Support
              </Link>
              <Link
                className={`${classes.optionMainLink} hover`}
                href={"/blog"}
              >
                Blogs &amp; Stories
              </Link>
              <Link
                className={`${classes.optionMainLink} hover`}
                href={"/contact"}
              >
                Get in Touch
              </Link>
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
                pathname === "/blog" ? classes.option_selected : ""
              }`}
              href="/blog"
              onClick={routeSelect}
            >
              Blogs
            </Link>
            <Link
              className={`${classes.burger_option} ${
                pathname?.includes("/veda") ? classes.option_selected : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(1);
              }}
            >
              Veda
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
                pathname?.includes("/purana") ? classes.option_selected : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(2);
              }}
            >
              Purana
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
                pathname?.includes("/upanishad") ? classes.option_selected : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(3);
              }}
            >
              Upanishad
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
                pathname?.includes("/others") ? classes.option_selected : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSecDrawer(4);
              }}
            >
              Others
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
              Veda
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/veda/rig" ? classes.option_selected_small : ""
              }`}
              href="/veda/rig"
              onClick={routeSelectSmall}
            >
              Rig Veda
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/veda/yajur" ? classes.option_selected_small : ""
              }`}
              href="/veda/yajur"
              onClick={routeSelectSmall}
            >
              Yajur Veda
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/veda/sam" ? classes.option_selected_small : ""
              }`}
              href="/veda/sam"
              onClick={routeSelectSmall}
            >
              Sam Veda
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/veda/atharv" ? classes.option_selected_small : ""
              }`}
              href="/veda/atharv"
              onClick={routeSelectSmall}
            >
              Atharv Veda
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
              Purana
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/purana/hindi"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/purana/hindi"
              onClick={routeSelectSmall}
            >
              Purana in Hindi
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/purana/english"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/purana/english"
              onClick={routeSelectSmall}
            >
              Purana in English
            </Link>
          </div>
          <div
            className={`${classes.burger_main} ${
              showSecDrawer === 3 ? classes.comeout_animation1 : ""
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
              Upanishad
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/upanishad/hindi"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/upanishad/hindi"
              onClick={routeSelectSmall}
            >
              Upanishad in Hindi
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/upanishad/english"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/upanishad/english"
              onClick={routeSelectSmall}
            >
              Upanishad in English
            </Link>
          </div>
          <div
            className={`${classes.burger_main} ${
              showSecDrawer === 4 ? classes.comeout_animation1 : ""
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
              Others
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/others/shloks"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/others/shloks"
              onClick={routeSelectSmall}
            >
              Shloks
            </Link>
            <Link
              className={`${classes.burger_option_small} ${
                pathname === "/others/books"
                  ? classes.option_selected_small
                  : ""
              }`}
              href="/others/books"
              onClick={routeSelectSmall}
            >
              Books
            </Link>
          </div>
        </>
      )}
    </>
  );
}
