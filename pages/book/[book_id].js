import { processPdf } from "@/lib/pdf_fetch";
import { bookMap, titleMap } from "@/lib/storage";
import BlackHole from "@/reuse/loader/blackHole";
import Planet1 from "@/reuse/planets/planet1";
import Planet2 from "@/reuse/planets/planet2";
import classes from "@/styles/book.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import {
  IoArrowBack,
  IoBookmarkOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

export default function BookMain() {
  const router = useRouter();
  const book_id = router.query.book_id;
  const pageRef = useRef(null);

  const [pageData, setPageData] = useState({});
  const [bookTitle, setBookTitle] = useState("Granth");
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(0);
  const [firstPageNo, setFirstPageNo] = useState(0);
  const [secondPageNo, setSecondPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const [error, setError] = useState(false);
  const [flip, setFlip] = useState({
    start: false,
    src: "",
    side: "",
    half: false,
  });

  useEffect(() => {
    async function fetchData(path) {
      setLoading(true);
      setPageNo(0);
      if (pageRef.current) {
        pageRef.current.value = 0;
      }

      try {
        const data = await processPdf(path, 1);
        setTotalPages(data.totalPages || 0);
        setPageData(
          data.images.reduce((acc, item, index) => {
            acc[index] = item;
            return acc;
          }, {})
        );
        setFirstPageNo(0);
        setSecondPageNo(1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    }

    if (book_id) {
      const path = bookMap[book_id];
      const title = titleMap[book_id] || "Granth";
      setBookTitle(title);
      if (path) {
        fetchData(path);
      }
    }
  }, [book_id]);

  useEffect(() => {
    async function nextLoad() {
      if (pageNo < totalPages) {
        setSmallLoading(true);
        const path = bookMap[book_id];
        try {
          const data = await processPdf(path, pageNo + 1);

          const newData = data.images.reduce((acc, item, index) => {
            acc[index + pageNo - 1] = item; //-1 because starating from 0 in pageNo.
            return acc;
          }, {});
          setPageData((prev) => ({
            ...prev,
            ...newData,
          }));
          setSmallLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(true);
          setSmallLoading(false);
        }
      }
    }
    if (!pageData[firstPageNo] && Object.keys(pageData).length > 0) {
      nextLoad();
    }
  }, [firstPageNo]);

  function leftClick() {
    if (flip.start === true) return;
    setFlip({
      start: true,
      src: pageData[pageNo - 1],
      side: "left",
      half: false,
    });
    if (pageNo > 1) {
      setPageNo(pageNo - 2);
      pageRef.current.value = pageNo - 2;
    } else {
      setPageNo(0);
      pageRef.current.value = 0;
    }
    setFirstPageNo(pageNo < 2 ? 0 : pageNo - 3);
    setTimeout(() => {
      setFlip({
        start: true,
        src: pageData[pageNo - 2 < 0 ? 0 : pageNo - 2],
        side: "left",
        half: true,
      });
    }, 200);
    setTimeout(() => {
      setFlip({
        start: false,
        src: "",
        side: "",
        half: false,
      });
      setSecondPageNo(pageNo < 2 ? 1 : pageNo - 2);
    }, 600);
  }

  function rightClick() {
    if (flip.start === true) return;
    if (pageNo === 0) {
      setPageNo(1);
      pageRef.current.value = 1;
      return;
    }
    setFlip({
      start: true,
      src: pageData[pageNo],
      side: "right",
      half: false,
    });
    if (pageNo < totalPages - 1) {
      setPageNo(pageNo + 2);
      pageRef.current.value = pageNo + 2;
    } else {
      setPageNo(totalPages);
      pageRef.current.value = totalPages;
    }
    setSecondPageNo(pageNo === 0 ? 1 : pageNo + 2);
    setTimeout(() => {
      setFlip({
        start: true,
        src: pageData[pageNo + 1 > totalPages ? totalPages : pageNo + 1],
        side: "right",
        half: true,
      });
    }, 200);
    setTimeout(() => {
      setFlip({
        start: false,
        src: "",
        side: "",
        half: false,
      });
      setFirstPageNo(pageNo === 0 ? 0 : pageNo + 1);
    }, 600);
  }

  return (
    <div className={classes.main}>
      <div className={classes.shootingStar1}></div>
      <div className={classes.shootingStar2}></div>
      <div className={classes.shootingStar3}></div>
      <div className={classes.planetOne}>
        <Planet1 />
      </div>
      <div className={classes.planetTwo}>
        <Planet2 />
      </div>
      {error ? (
        <div>Error</div>
      ) : (
        <div className={classes.bookContent}>
          {loading ? (
            <div className={classes.loaderHolder}>
              <BlackHole />
            </div>
          ) : (
            <div className={classes.bookHolderMain}>
              <div className={classes.imagesAll}>
                {pageNo === 0 && (
                  <>
                    <img
                      src="/book/covers_left.png"
                      alt="Page 0"
                      onClick={() => setPageNo(1)}
                      draggable="false"
                      style={{
                        filter: "brightness(0.8)",
                      }}
                    />
                    <div className={classes.bookTitleMain}>{bookTitle}</div>
                  </>
                )}
                {Object.keys(pageData).length > 0 &&
                  pageNo < totalPages &&
                  pageNo > 0 && (
                    <>
                      <img
                        src="/book/pages1.png"
                        alt="PageMain"
                        draggable="false"
                        className={classes.bookPages}
                      />
                      <div className={classes.images}>
                        <img
                          src={
                            pageData[firstPageNo]
                              ? // ? `data:image/png;base64,${pageData[firstPageNo]}`
                                pageData[firstPageNo]
                              : "/book/page_temp.png"
                          }
                          alt={`Page ${pageNo}`}
                          draggable="false"
                          style={smallLoading ? { display: "none" } : {}}
                          onClick={leftClick}
                        />
                        <img
                          src={
                            pageData[secondPageNo]
                              ? // ? `data:image/png;base64,${pageData[secondPageNo]}`
                                pageData[secondPageNo]
                              : "/book/page_temp_2.png"
                          }
                          alt={`Page ${pageNo + 1}`}
                          draggable="false"
                          style={smallLoading ? { display: "none" } : {}}
                          onClick={rightClick}
                        />
                        <div
                          style={
                            !flip.start || flip.side !== "right"
                              ? { visibility: "hidden" }
                              : flip.half
                              ? {
                                  left: 0,
                                }
                              : {}
                          }
                          className={`${classes.flipContainer} ${
                            classes.flip
                          } ${
                            flip.start
                              ? flip.side === "right"
                                ? classes.flippedRight
                                : ""
                              : ""
                          }`}
                          draggable="false"
                        >
                          <img
                            src={
                              flip.src
                                ? flip.src
                                : // ? `data:image/png;base64,${flip.src}`
                                  "/book/page_temp_2.png"
                            }
                            alt={`Flipping Page`}
                            style={
                              flip.half && flip.side === "right"
                                ? {
                                    transform: "rotateY(-180deg)",
                                  }
                                : {}
                            }
                            draggable="false"
                          />
                        </div>
                        <div
                          style={
                            !flip.start || flip.side !== "left"
                              ? { visibility: "hidden" }
                              : flip.half
                              ? {
                                  right: 0,
                                }
                              : {}
                          }
                          className={`${classes.flipContainer} ${
                            classes.flipL
                          } ${
                            flip.start
                              ? flip.side === "left"
                                ? classes.flippedLeft
                                : ""
                              : ""
                          }`}
                          draggable="false"
                        >
                          <img
                            src={
                              flip.src
                                ? flip.src
                                : // ? `data:image/png;base64,${flip.src}`
                                  "/book/page_temp.png"
                            }
                            alt={`Flipping Page`}
                            style={
                              flip.half && flip.side === "left"
                                ? {
                                    transform: "rotateY(180deg)",
                                  }
                                : {}
                            }
                            draggable="false"
                          />
                        </div>
                      </div>
                    </>
                  )}
                {pageNo === totalPages && (
                  <img
                    src="/book/covers_right.png"
                    alt="last Page"
                    draggable="false"
                    onClick={() => {
                      setPageNo(totalPages - 2);
                      pageRef.current.value = totalPages - 2;
                      setFirstPageNo(totalPages - 3);
                      setSecondPageNo(totalPages - 2);
                    }}
                    style={{
                      filter: "brightness(0.8)",
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className={`${classes.backButton} hover`}
        onClick={() => router.back()}
      >
        <IoArrowBack />
      </div>
      <div className={`${classes.bookmarkButton} hover`}>
        <IoBookmarkOutline />
      </div>
      <div className={`${classes.backPage} hover`} onClick={leftClick}>
        <IoChevronBackOutline />
      </div>
      <div className={`${classes.forwardPage} hover`} onClick={rightClick}>
        <IoChevronForwardOutline />
      </div>
      <form
        className={classes.fastForward}
        onSubmit={(e) => {
          e.preventDefault();
          let page = parseInt(pageRef.current.value);
          if (isNaN(page) || page < 1 || page > totalPages) return;
          if (page % 2 === 0) page--;
          setPageNo(page);
          setFirstPageNo(page - 1);
          setSecondPageNo(page);
        }}
      >
        <input
          className={classes.fastForwardInput}
          type="number"
          ref={pageRef}
          min={1}
          max={totalPages - 1}
        />
        <button type="submit" className={classes.fastForwardButton}>
          <FaAngleDoubleRight />
        </button>
      </form>
    </div>
  );
}
