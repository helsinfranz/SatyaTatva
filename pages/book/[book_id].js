import { processPdf } from "@/lib/pdf_fetch";
import { bookMap, titleMap } from "@/lib/storage";
import BlackHole from "@/reuse/loader/blackHole";
import Planet1 from "@/reuse/planets/planet1";
import Planet2 from "@/reuse/planets/planet2";
import classes from "@/styles/book.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { FaAngleDoubleRight, FaForward } from "react-icons/fa";
import {
  IoArrowBack,
  IoBookmark,
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
  const [bookmarked, setBookmarked] = useState(0);
  const [quality, setQuality] = useState(1);
  const [zoom, setZoom] = useState(0);
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
        setFirstPageNo(0);
        setSecondPageNo(1);
        setQuality(1);
        const slug = `data-${book_id}`;
        const stored = JSON.parse(localStorage.getItem(slug) || "{}");
        if (stored || Object.keys(stored).length > 0) {
          if (stored.bookmarked) {
            setBookmarked(stored.bookmarked);
          }
          if (stored.quality) {
            setQuality(parseFloat(stored.quality) || 1);
          }
          setPageNo(stored.pageNo || 0);
          pageRef.current.value = stored.pageNo || 0;
          setFirstPageNo(stored.pageNo - 1 < 0 ? 0 : stored.pageNo - 1);
          setSecondPageNo(stored.pageNo);
        }
        const data = await processPdf(quality, path, 1);
        setTotalPages(data.totalPages || 0);
        setPageData(data.images);
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
          setPageData((prev) => filterPageData(pageNo + 1, prev));

          const data = await processPdf(
            quality,
            path,
            pageNo + 1,
            Object.keys(pageData)
          );

          setPageData((prev) => ({
            ...prev,
            ...data.images,
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
      savePageNo(pageNo - 2);
    } else {
      setPageNo(0);
      pageRef.current.value = 0;
      savePageNo(0);
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
      savePageNo(pageNo + 2);
    } else {
      setPageNo(totalPages);
      pageRef.current.value = totalPages;
      savePageNo(totalPages);
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

  function savePageNo(pageNumber) {
    if (!localStorage) return;
    const slug = `data-${book_id}`;
    const stored = JSON.parse(localStorage.getItem(slug) || "{}");
    const newStore = {
      ...stored,
      pageNo: pageNumber,
    };
    localStorage.setItem(slug, JSON.stringify(newStore));
  }

  function zoomIn() {
    if (zoom === 3) return;
    setZoom((prev) => prev + 1);
  }

  function zoomOut() {
    if (zoom === 0) return;
    setZoom((prev) => prev - 1);
  }

  function filterPageData(currentPage, pageData) {
    const start = Math.max(0, currentPage - 15);
    const end = currentPage + 16;
    return Object.keys(pageData)
      .filter((key) => {
        const pageNumber = parseInt(key, 10);
        return pageNumber >= start && pageNumber <= end;
      })
      .reduce((filteredData, key) => {
        filteredData[key] = pageData[key];
        return filteredData;
      }, {});
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
        <div
          className={classes.bookContent}
          style={{ zoom: zoom, overflowX: "auto" }}
        >
          {loading ? (
            <div className={classes.loaderHolder}>
              <BlackHole />
            </div>
          ) : (
            <div
              className={classes.bookHolderMain}
              style={zoom >= 2 ? { justifyContent: "unset" } : {}}
            >
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
      <div
        className={`${classes.bookmarkButton} hover`}
        title={bookmarked ? "Remove Bookmark" : "Bookmark"}
        onClick={() => {
          if (bookmarked) {
            localStorage.setItem(
              `data-${book_id}`,
              JSON.stringify({
                pageNo: pageNo,
                quality: quality,
              })
            );
            setBookmarked(0);
          } else {
            if (pageNo === 0 || pageNo === totalPages) return;
            localStorage.setItem(
              `data-${book_id}`,
              JSON.stringify({
                pageNo: pageNo,
                bookmarked: pageNo,
                quality: quality,
              })
            );
            setBookmarked(pageNo);
          }
        }}
      >
        {bookmarked > 0 ? <IoBookmark /> : <IoBookmarkOutline />}
      </div>
      {bookmarked > 0 && (
        <div
          className={`${classes.bookmarkButton} ${classes.goTobBookmarkButton} hover`}
          title="Go to Bookmark"
          onClick={() => {
            let page = bookmarked;
            if (page % 2 === 0) page--;
            setPageNo(page);
            setFirstPageNo(page - 1);
            setSecondPageNo(page);
            pageRef.current.value = page;
          }}
        >
          <FaForward />
        </div>
      )}
      <div
        className={`${classes.qualityButton} ${
          bookmarked > 0 ? classes.bookmarkActiveQuality : ""
        } hover`}
        title={`${
          quality === 1 ? "Low" : quality === 1.5 ? "Medium" : "High"
        } Quality`}
        onClick={() => {
          const slug = `data-${book_id}`;
          const stored = JSON.parse(localStorage.getItem(slug) || "{}");
          const newQuality = quality === 1 ? 1.5 : quality === 1.5 ? 2 : 1;
          const newStore = {
            ...stored,
            quality: newQuality,
          };
          localStorage.setItem(slug, JSON.stringify(newStore));
          setQuality(newQuality);
        }}
      >
        {quality}x
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
      <div className={classes.zoom}>
        <div
          className={`${classes.zoomIn} hover`}
          onClick={zoomIn}
          style={zoom === 3 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          <BsZoomIn />
        </div>
        <div
          className={`${classes.zoomOut} hover`}
          onClick={zoomOut}
          style={zoom === 0 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          <BsZoomOut />
        </div>
      </div>
    </div>
  );
}
