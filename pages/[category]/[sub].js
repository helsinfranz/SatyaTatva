import FooterMain from "@/components/footer/footerMain";
import { getCategoriesArray } from "@/lib/storage";
import classes from "@/styles/sub.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Sub() {
  const pathname = usePathname();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [sub, setSub] = useState(null);
  const [contentDetails, setContentDetails] = useState([]);

  useEffect(() => {
    if (router.query.category && router.query.sub) {
      setSub(router.query.category);
      setCategory(router.query.sub + " " + router.query.category);
    }
  }, [router.query]);

  useEffect(() => {
    if (category && sub) {
      setContentDetails(
        getCategoriesArray(router.query.category, router.query.sub)
      );
    }
  }, [category, sub]);

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
            {category?.charAt(0)?.toUpperCase() + category?.slice(1) ||
              "Category"}
          </h1>
          <p>
            {sub?.charAt(0)?.toUpperCase() + sub?.slice(1) || "Sub Category"}
          </p>
        </div>
      </div>
      <div className={classes.main}>
        {contentDetails.map((content, idx) => (
          <div className={classes.contentMain} key={idx}>
            <div className={`${classes.contentMainImg} hover`}>
              <Image
                width={600}
                height={400}
                src={content.image}
                alt={content.title}
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
                  href={`/book/${content.slug}`}
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
          <Link
            className={`${classes.pagination} ${classes.selectedPagination}`}
            href={pathname ? pathname : "/"}
          >
            1
          </Link>
          <div className={classes.dashPagination}></div>
          <Link
            className={classes.pagination}
            href={pathname + "?page=2" ? pathname + "?page=2" : "/"}
          >
            2
          </Link>
          <div className={classes.dashPagination}></div>
          <div
            className={`${classes.pagination} ${classes.disabledPagination}`}
          >
            ...
          </div>
          <div className={classes.dashPagination}></div>
          <Link
            className={classes.pagination}
            href={pathname + "?page=3" ? pathname + "?page=3" : "/"}
          >
            4
          </Link>
          <div className={classes.dashPagination}></div>
          <Link
            className={classes.paginationNext}
            href={pathname + "?page=2" ? pathname + "?page=2" : "/"}
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
