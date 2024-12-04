import { bookMap } from "@/lib/storage";
import BlackHole from "@/reuse/loader/blackHole";
import classes from "@/styles/book.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookMain() {
  const router = useRouter();
  const book_id = router.query.book_id;

  const [pageData, setPageData] = useState([]);
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
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: 1, filePath: path }),
      });
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTotalPages(data.totalPages || 0);
      setPageData(data.images || []);
      setFirstPageNo(0);
      setSecondPageNo(1);
      setLoading(false);
    }

    if (book_id) {
      const path = bookMap[book_id];
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
        const res = await fetch("/api/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: pageNo + 1, filePath: path }),
        });
        if (!res.ok) {
          setError(true);
          setSmallLoading(false);
          return;
        }
        const data = await res.json();
        setPageData((prev) => [...prev, ...data.images]);
        setSmallLoading(false);
      }
    }
    if (!pageData[firstPageNo] && pageData.length > 0) {
      nextLoad();
    }
  }, [firstPageNo]);

  return (
    <div className={classes.main}>
      <div className={classes.shootingStar1}></div>
      <div className={classes.shootingStar2}></div>
      <div className={classes.shootingStar3}></div>
      {error ? (
        <div>Error</div>
      ) : (
        <div className={classes.bookContent}>
          {loading ? (
            <div className={classes.loaderHolder}>
              <BlackHole />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={classes.imagesAll}>
                {pageNo === 0 && (
                  <img
                    src="/book/covers_left.png"
                    alt="Page 0"
                    onClick={() => setPageNo(1)}
                  />
                )}
                {pageData.length > 0 && pageNo < totalPages && pageNo > 0 && (
                  <>
                    <img
                      src="/book/pages1.png"
                      alt="PageMain"
                      className={classes.bookPages}
                    />
                    <div className={classes.images}>
                      <img
                        src={
                          pageData[firstPageNo]
                            ? `data:image/png;base64,${pageData[firstPageNo]}`
                            : "/book/page_temp.png"
                        }
                        alt={`Page ${pageNo}`}
                        style={smallLoading ? { display: "none" } : {}}
                        onClick={() => {
                          if (flip.start === true) return;
                          setFlip({
                            start: true,
                            src: pageData[pageNo - 1],
                            side: "left",
                            half: false,
                          });
                          if (pageNo > 1) {
                            setPageNo(pageNo - 2);
                          } else {
                            setPageNo(0);
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
                        }}
                        // onError={nextLoad}
                      />
                      <img
                        src={
                          pageData[secondPageNo]
                            ? `data:image/png;base64,${pageData[secondPageNo]}`
                            : "/book/page_temp_2.png"
                        }
                        alt={`Page ${pageNo + 1}`}
                        style={smallLoading ? { display: "none" } : {}}
                        onClick={() => {
                          if (flip.start === true) return;
                          setFlip({
                            start: true,
                            src: pageData[pageNo],
                            side: "right",
                            half: false,
                          });
                          if (pageNo < totalPages - 1) {
                            setPageNo(pageNo + 2);
                          } else {
                            setPageNo(totalPages);
                          }
                          setSecondPageNo(pageNo === 0 ? 1 : pageNo + 2);
                          setTimeout(() => {
                            setFlip({
                              start: true,
                              src: pageData[
                                pageNo + 1 > totalPages
                                  ? totalPages
                                  : pageNo + 1
                              ],
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
                        }}
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
                        className={`${classes.flipContainer} ${classes.flip} ${
                          flip.start
                            ? flip.side === "right"
                              ? classes.flippedRight
                              : ""
                            : ""
                        }`}
                      >
                        <img
                          src={
                            flip.src
                              ? `data:image/png;base64,${flip.src}`
                              : "/book/page_temp_2.png"
                          }
                          alt={`Flipping Page`}
                          style={
                            flip.half && flip.side === "right"
                              ? {
                                  transform: "rotateY(-180deg)",
                                }
                              : {}
                          }
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
                        className={`${classes.flipContainer} ${classes.flipL} ${
                          flip.start
                            ? flip.side === "left"
                              ? classes.flippedLeft
                              : ""
                            : ""
                        }`}
                      >
                        <img
                          src={
                            flip.src
                              ? `data:image/png;base64,${flip.src}`
                              : "/book/page_temp.png"
                          }
                          alt={`Flipping Page`}
                          style={
                            flip.half && flip.side === "left"
                              ? {
                                  transform: "rotateY(180deg)",
                                }
                              : {}
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
                {pageNo === totalPages && (
                  <img
                    src="/book/covers_right.png"
                    alt="last Page"
                    onClick={() => setPageNo((prev) => prev - 2)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
