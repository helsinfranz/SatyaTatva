import classes from "./header.module.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);
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
        <div className={classes.mainHeader}></div>
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
