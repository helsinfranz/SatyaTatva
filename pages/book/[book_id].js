import { processPdf } from "@/lib/pdf_fetch";
import { bookMap, fileSizes, getSingleBookData, titleMap } from "@/lib/storage";
import languageDetect from "@/reuse/languageDetect";
import BlackHole from "@/reuse/loader/blackHole";
import ProgressBar from "@/reuse/loader/progressBar";
import Planet1 from "@/reuse/planets/planet1";
import Planet2 from "@/reuse/planets/planet2";
import { shortText } from "@/reuse/shortText";
import classes from "@/styles/book.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { FaAngleDoubleRight, FaForward, FaHome } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
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
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState(0);
  const [bookmarked, setBookmarked] = useState(0);
  const [quality, setQuality] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [progress, setProgress] = useState(100);
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
        setProgress(100);
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
        const data = await processPdf(
          quality,
          path,
          stored ? (stored.pageNo ? stored.pageNo - 1 : 1) : 1,
          {},
          setProgress
        );
        setTotalPages(data.totalPages + 1 || 0);
        setPageData(data.images);
        const localStorageData = localStorage.getItem("mostRecent");
        const bookData = getSingleBookData(book_id);
        const addingData = [
          {
            name: bookData.title,
            link: "/book/" + book_id,
            detail: bookData.subTitle,
            img: bookData.image,
          },
        ];
        if (localStorageData) {
          const parsedData = JSON.parse(localStorageData);
          if (parsedData.some((item) => item.link === "/book/" + book_id)) {
            setLoading(false);
            return;
          }
          const updatedData = [...addingData, parsedData[0]];
          localStorage.setItem("mostRecent", JSON.stringify(updatedData));
        } else {
          localStorage.setItem(
            "mostRecent",
            JSON.stringify([...addingData, ...addingData])
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setErrorType(1);
        setLoading(false);
      }
    }

    if (book_id) {
      const path = bookMap[book_id];
      const title = titleMap[book_id] || "Granth";
      setBookTitle(title);
      if (path) {
        fetchData(path);
      } else {
        setError(true);
        setErrorType(2);
      }
    }
  }, [book_id]);

  useEffect(() => {
    async function nextLoad() {
      if (pageNo < totalPages) {
        if (pageNo === 0) return;
        setLoading(true);
        const path = bookMap[book_id];
        try {
          setPageData((prev) => filterPageData(pageNo + 1, prev));

          const data = await processPdf(
            quality,
            path,
            pageNo + 1,
            Object.keys(pageData).map((key) => parseInt(key, 10))
          );

          setPageData((prev) => ({
            ...prev,
            ...data.images,
          }));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(true);
          setErrorType(1);
          setLoading(false);
        }
      }
    }
    if (!pageData[firstPageNo] && Object.keys(pageData).length > 0) {
      nextLoad();
    }
  }, [firstPageNo]);

  function leftClick() {
    if (flip.start === true || error) return;
    if (pageNo === totalPages) {
      setPageNo(totalPages - 1);
      pageRef.current.value = totalPages - 1;
      setFirstPageNo(totalPages - 2);
      setSecondPageNo(totalPages - 1);
      return;
    }
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
    if (flip.start === true || error) return;
    if (pageNo === 0) {
      setPageNo(2);
      pageRef.current.value = 2;
      setFirstPageNo(1);
      setSecondPageNo(2);
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
    if (!localStorage || error) return;
    const slug = `data-${book_id}`;
    const stored = JSON.parse(localStorage.getItem(slug) || "{}");
    const newStore = {
      ...stored,
      pageNo: pageNumber,
    };
    if (pageNumber < 3 && Object.keys(stored).length > 0) return;
    localStorage.setItem(slug, JSON.stringify(newStore));
  }

  function zoomIn() {
    if (zoom === 3) return;
    setZoom((prev) => prev + 1);
  }

  function zoomOut() {
    if (zoom === 1) return;
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

  function percentage() {
    if (progress >= 100) {
      return "Loading...";
    }
    const url = bookMap[book_id];
    for (const [unit, size] of Object.entries(fileSizes)) {
      if (url.includes(unit)) {
        const fileSizeInMB = parseFloat(size.split("MB")[0]).toFixed(2);
        return `${parseFloat(progress * fileSizeInMB / 100).toFixed(2)} MB / ${parseFloat(fileSizeInMB).toFixed(2)} MB`;
      }
    }
  }
  return (
    <>
      <Head>
        <title>
          {languageDetect(titleMap[book_id])
            ? `Read ${titleMap[book_id]} Online / Offline - SatyaTatva`
            : `${titleMap[book_id]} ऑनलाइन/ऑफ़लाइन पढ़ें - सत्यतत्व`}
        </title>
        <meta
          name="description"
          content={
            languageDetect(titleMap[book_id])
              ? `Explore the sacred text of ${titleMap[book_id]}, a profound scripture of Sanatan Dharma, with an engaging interface on SatyaTatva.`
              : `सत्यतत्व पर एक आकर्षक इंटरफ़ेस के साथ, सनातन धर्म के एक गहन ग्रंथ, ${titleMap[book_id]} के पवित्र पाठ का अन्वेषण करें।`
          }
        />
      </Head>
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
        {error && errorType === 1 && (
          <div className={classes.error}>
            <div className={classes.errorMain}>
              <div className="title-404">Loading Error</div>
              <div className="subheading-404">
                <p>
                  Something went wrong, and failed to load the book content.
                </p>
                <p>You can refresh to fix this issue.</p>
              </div>
              <div className="gohome-404 hover" onClick={() => router.reload()}>
                Refresh
                <IoMdRefresh />
              </div>
            </div>
          </div>
        )}
        {error && errorType === 2 && (
          <div className={classes.error}>
            <div className={classes.errorMain}>
              <div className="title-404">Book not found</div>
              <div className="subheading-404">
                <p>
                  Something went wrong, and we cannot find the book you are
                  looking for.
                </p>
                <p>You can return to the Home Page or mail us.</p>
              </div>
              <Link className="gohome-404 hover" href={"/"}>
                Go to Home
                <FaHome />
              </Link>
            </div>
          </div>
        )}
        {!error && (
          <div
            className={classes.bookContent}
            style={{ zoom: zoom, overflowX: "auto" }}
          >
            {loading ? (
              <>
                <div className={classes.loaderHolder}>
                  <BlackHole />
                </div>
                <div className={classes.progressBar}>
                  <div className={classes.progressMB}>{percentage()}</div>
                  <ProgressBar progress={progress} />
                </div>
              </>
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
                        onClick={() => {
                          setPageNo(2);
                          pageRef.current.value = 2;
                          setFirstPageNo(1);
                          setSecondPageNo(2);
                        }}
                        draggable="false"
                        fetchPriority="high"
                        style={{
                          filter: "brightness(0.8)",
                        }}
                      />
                      <div className={classes.bookTitleMain}>
                        {shortText(bookTitle)}
                      </div>
                    </>
                  )}
                  {Object.keys(pageData).length > 0 &&
                    pageNo < totalPages &&
                    pageNo > 0 && (
                      <>
                        <img
                          src="/book/pages.png"
                          alt="PageMain"
                          draggable="false"
                          fetchPriority="high"
                          className={classes.bookPages}
                        />
                        <div className={classes.images}>
                          <img
                            src={
                              pageData[firstPageNo]
                                ? pageData[firstPageNo]
                                : "/book/page_temp.png"
                            }
                            alt={`Page ${pageNo}`}
                            draggable="false"
                            onClick={leftClick}
                          />
                          <img
                            src={
                              pageData[secondPageNo]
                                ? pageData[secondPageNo]
                                : "/book/page_temp_2.png"
                            }
                            alt={`Page ${pageNo + 1}`}
                            draggable="false"
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
                            className={`${classes.flipContainer} ${classes.flip
                              } ${flip.start
                                ? flip.side === "right"
                                  ? classes.flippedRight
                                  : ""
                                : ""
                              }`}
                            draggable="false"
                          >
                            <img
                              src={
                                flip.src ? flip.src : "/book/page_temp_2.png"
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
                            className={`${classes.flipContainer} ${classes.flipL
                              } ${flip.start
                                ? flip.side === "left"
                                  ? classes.flippedLeft
                                  : ""
                                : ""
                              }`}
                            draggable="false"
                          >
                            <img
                              src={flip.src ? flip.src : "/book/page_temp.png"}
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
                        setPageNo(totalPages - 1);
                        pageRef.current.value = totalPages - 1;
                        setFirstPageNo(totalPages - 2);
                        setSecondPageNo(totalPages - 1);
                      }}
                      fetchPriority="high"
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
            if (error) return;
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
              if (page % 2 !== 0) page++;
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
          className={`${classes.qualityButton} ${bookmarked > 0 ? classes.bookmarkActiveQuality : ""
            } hover`}
          title={`${quality === 1 ? "Low" : quality === 1.5 ? "Medium" : "High"
            } Quality`}
          onClick={() => {
            if (error) return;
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
            if (error) return;
            let page = parseInt(pageRef.current.value);
            if (isNaN(page) || page < 1 || page > totalPages) return;
            if (page % 2 !== 0) page++;
            setPageNo(page);
            pageRef.current.value = page;
            setFirstPageNo(page - 1);
            setSecondPageNo(page);
          }}
        >
          <input
            className={classes.fastForwardInput}
            style={loading ? { cursor: "not-allowed" } : {}}
            type="number"
            ref={pageRef}
            min={1}
            max={totalPages - 1}
            disabled={loading}
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
            style={zoom === 1 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            <BsZoomOut />
          </div>
        </div>
      </div>
    </>
  );
}
