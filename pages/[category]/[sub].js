import FooterMain from "@/components/footer/footerMain";
import { getCategories, getCategoriesArray } from "@/lib/storage";
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
  useEffect(() => {
    if (contentArray.length > 0) {
      setPages(Math.ceil(contentArray.length / 4));
      setContent(
        contentArray.slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
      );
    }
  }, [currentPage, contentArray]);

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(1);
    }
  }, [page]);

  return (
    <div className={classes.container}>
      <div className={classes.topHero}>
        <div className={classes.heroImage}>
          <Image
            src="/testingHero.jpg"
            alt="Picture of the author"
            width={1200}
            height={500}
          />
        </div>
        <div className={classes.heroText}>
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
              <Image
                width={600}
                height={400}
                src={content.image}
                alt={content.title}
                // fill={true}
                // sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
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
                  Continue Reading
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
                    >
                      {page}
                    </Link>
                    <div className={classes.dashPagination}></div>
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
                    <div className={classes.dashPagination}></div>
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
                    <div className={classes.dashPagination}></div>
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
