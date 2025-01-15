import FooterMain from "@/components/footer/footerMain";
import { getCategories, getCategoriesArray, getFileSize } from "@/lib/storage";
import MeteorLoader from "@/reuse/loader/meteor";
import classes from "@/styles/sub.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Sub({ categoryProp, subProp, contentArray }) {
  const pathname = usePathname();
  const router = useRouter();
  const { sub, page } = router.query;
  const [content, setContent] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoad, setImageLoad] = useState([]);
  const [imageError, setImageError] = useState([]);
  useEffect(() => {
    if (contentArray.length > 0) {
      setPages(Math.ceil(contentArray.length / 4));
      setContent(
        contentArray.slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
      );
      setImageLoad([]);
      setImageError([]);
    }
  }, [currentPage, contentArray]);

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(1);
    }
  }, [page]);

  useEffect(() => {
    function checkScroll() {
      const scrollContainer = document.getElementById("scrollContainer");
      const scrollPosition = scrollContainer.scrollTop;
      const parallaxElement = document.getElementById("heroImage");
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(calc(-50% - ${
          scrollPosition * 0.25
        }px))`;
      }
    }
    const scrollContainer = document.getElementById("scrollContainer");

    scrollContainer.addEventListener("scroll", checkScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div className={classes.container} id="scrollContainer">
      <div className={classes.topHero}>
        <div className={classes.heroImage}>
          <Image
            src={
              categoryProp === "purana"
                ? "/banners/purana.jpg"
                : categoryProp === "upanishad"
                ? "/banners/upanishad.jpg"
                : "/banners/veda.jpg"
            }
            alt={`${categoryProp} banner`}
            priority={true}
            width={1200}
            height={500}
          />
        </div>
        <div className={classes.heroText} id="heroImage">
          <h1>
            {categoryProp?.charAt(0)?.toUpperCase() + categoryProp?.slice(1) ||
              "Category"}
          </h1>
          <p>
            {(subProp + " " + categoryProp)?.charAt(0)?.toUpperCase() +
              (subProp + " " + categoryProp)?.slice(1) || "Sub Category"}
          </p>
        </div>
      </div>
      <div className={classes.main}>
        {content.map((content, idx) => (
          <div className={classes.contentMain} key={idx}>
            <div className={`${classes.contentMainImg} hover`}>
              {!imageLoad.includes(idx) && <MeteorLoader />}
              {imageError.includes(idx) ? (
                <div className={classes.contentMainSvg}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m41.37 64 22.628-22.628L470.627 448l-22.628 22.627zm-2.65 148.78C13.39 235.88 0 267.42 0 304c0 36 14.38 68.88 40.49 92.59C65.64 419.43 99.56 432 136 432h228.12L110.51 178.39c-28.01 5.39-53.09 17.33-71.79 34.39zm437.87 194.45C499.76 388.78 512 361.39 512 328c0-61.85-48.44-95.34-97.75-102.64-6.52-41.18-24.05-76.4-51.11-102.46A153.57 153.57 0 0 0 256 80c-30.47 0-58.9 8.62-83.07 25l302.82 302.86c.25-.21.57-.41.84-.63z"></path>
                  </svg>
                </div>
              ) : (
                <Image
                  width={600}
                  height={400}
                  src={content.image}
                  alt={content.title}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority={true}
                  onLoad={() => {
                    setImageLoad((prev) => [...prev, idx]);
                  }}
                  onError={() => {
                    setImageError((prev) => [...prev, idx]);
                    setImageLoad((prev) => [...prev, idx]);
                  }}
                />
              )}
            </div>
            <div className={classes.contentMainDetails}>
              <div className={classes.contentTitleDetails}>
                <div className={`${classes.contentTitle} hover`}>
                  {content.title}
                </div>
                <div className={classes.contentSubTitle}>
                  {content.subTitle}
                  <span></span>
                  {content.likes} Likes
                </div>
                {subProp !== "shloks" && (
                  <div
                    className={classes.contentSize}
                    title="First Time Loading Size"
                  >
                    {getFileSize(content.slug)}
                  </div>
                )}
              </div>
              <div className={classes.contentDescriptionDetails}>
                <div className={classes.contentDescription}>
                  {content.description}
                </div>
                <Link
                  className={`${classes.contentMore} hover`}
                  href={
                    sub === "shloks"
                      ? `/shlok/${content.slug}`
                      : `/book/${content.slug}`
                  }
                >
                  {sub === "shloks"
                    ? "पाठ करना प्रारंभ करें"
                    : sub === "hindi"
                    ? "पढ़ना शुरू करें"
                    : /^[a-zA-Z0-9- ]+$/.test(content.title)
                    ? "Start Reading"
                    : "पढ़ना शुरू करें"}
                  <MdKeyboardArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className={classes.paginations}>
          <div className={classes.dashBigPagination}></div>
          {currentPage > 1 && (
            <>
              <Link
                className={classes.paginationNext}
                href={
                  pathname + `?page=${currentPage - 1}` && currentPage > 1
                    ? pathname + `?page=${currentPage - 1}`
                    : "/"
                }
                shallow={true}
              >
                <MdKeyboardArrowLeft />
              </Link>
              <div className={classes.dashPagination}></div>
            </>
          )}
          {[...Array(pages)].map((_, index) => {
            const page = index + 1;
            const isLastPage = page === pages;
            const isFirstPage = page === 1;
            const isSecondPage = page === 2;

            // Define conditions for showing each page based on `currentPage`
            const showFirstTwoPages =
              currentPage < 3 && (isFirstPage || isSecondPage);
            const showCurrentAndNext =
              (currentPage >= 3 && page === currentPage) ||
              page === currentPage + 1;
            const showLastPage = isLastPage;

            return (
              <>
                {/* Show first two pages only when on the first or second page */}
                {(showFirstTwoPages || showCurrentAndNext || showLastPage) && (
                  <>
                    <Link
                      className={
                        page === currentPage
                          ? `${classes.pagination} ${classes.selectedPagination}`
                          : classes.pagination
                      }
                      href={{ pathname, query: { page } }}
                      key={page}
                      shallow={true}
                    >
                      {page}
                    </Link>
                    <div
                      className={classes.dashPagination}
                      key="pagination1"
                    ></div>
                  </>
                )}

                {/* Ellipsis logic */}
                {page === 2 && currentPage > 2 && !showLastPage && (
                  <>
                    <div
                      className={`${classes.pagination} ${classes.disabledPagination}`}
                      key="ellipsis-1"
                    >
                      ...
                    </div>
                    <div
                      className={classes.dashPagination}
                      key="pagination2"
                    ></div>
                  </>
                )}

                {/* Second ellipsis before the last page if there’s a gap */}
                {page === pages - 1 && currentPage < pages - 2 && (
                  <>
                    <div
                      className={`${classes.pagination} ${classes.disabledPagination}`}
                      key="ellipsis-2"
                    >
                      ...
                    </div>
                    <div
                      className={classes.dashPagination}
                      key="pagination3"
                    ></div>
                  </>
                )}
              </>
            );
          })}
          <Link
            className={classes.paginationNext}
            href={
              pathname + `?page=${currentPage + 1}` && currentPage < pages
                ? pathname + `?page=${currentPage + 1}`
                : "/"
            }
            onClick={(e) => {
              if (currentPage >= pages) e.preventDefault();
            }}
            shallow={true}
          >
            <MdKeyboardArrowRight />
          </Link>
          <div className={classes.dashBigPagination}></div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
}

export async function getStaticPaths() {
  const categoryArray = getCategories();
  return {
    paths: categoryArray,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category, sub } = params;
  try {
    const contentArray = getCategoriesArray(category, sub);
    return {
      props: {
        categoryProp: category,
        subProp: sub,
        contentArray: contentArray,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
  return {
    props: { categoryProp: category, subProp: sub, contentArray: [] },
  };
}
