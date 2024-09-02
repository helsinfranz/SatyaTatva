import { useEffect, useRef, useState } from "react";
import styles from "./cursor.module.css";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";

export default function Cursor() {
  const cursorRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          x - cursorRef.current.offsetWidth / 2
        }px, ${y - cursorRef.current.offsetHeight / 2}px, 0)`;
      }
    };

    const handleScrollMouseOver = (e) => {
      cursorRef.current.classList.add(styles.cursorScroll);
      const { target } = e;
      if (target.scrollWidth > target.clientWidth) {
        setScrollDirection("vertical");
      } else if (target.scrollHeight > target.clientHeight) {
        setScrollDirection("horizontal");
      } else {
        setScrollDirection("");
      }
    };
    const handleMouseOver = () => {
      cursorRef.current.classList.add(styles.cursorHover);
    };

    const handleScrollMouseOut = () => {
      cursorRef.current.classList.remove(styles.cursorScroll);
      setScrollDirection("");
    };

    const handleMouseOut = () => {
      cursorRef.current.classList.remove(styles.cursorHover);
    };

    const handleClick = (e) => {
      const { clientX: x, clientY: y } = e;
      const ripple = document.createElement("div");
      ripple.className = styles.ripple;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      document.body.appendChild(ripple);

      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);
    document.querySelectorAll("a, button, .hover").forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);
    });

    document.querySelectorAll(".scrollable").forEach((element) => {
      element.addEventListener("mouseover", handleScrollMouseOver);
      element.addEventListener("mouseout", handleScrollMouseOut);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      document.querySelectorAll("a, button, .hover").forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseout", handleMouseOut);
      });

      document.querySelectorAll(".scrollable").forEach((element) => {
        element.removeEventListener("mouseover", handleScrollMouseOver);
        element.removeEventListener("mouseout", handleScrollMouseOut);
      });
    };
  }, []);

  return (
    <div
      className={`${styles.cursor} ${
        scrollDirection !== "" ? styles.cursorScroll : ""
      }`}
      ref={cursorRef}
    >
      {scrollDirection === "vertical" && (
        <div className={styles.vertical}>
          <div className={styles.back}>
            <IoIosArrowBack />
          </div>
          <div className={styles.front}>
            <IoIosArrowForward />
          </div>
        </div>
      )}
      {scrollDirection === "horizontal" && (
        <div className={styles.horizontal}>
          <div className={styles.up}>
            <IoIosArrowUp />
          </div>
          <div className={styles.down}>
            <IoIosArrowDown />
          </div>
        </div>
      )}
    </div>
  );
}
