import FooterMain from "@/components/footer/footerMain";
import classes from "@/styles/book.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";

const contentDetails = [
  {
    title: "Skhand Concept",
    subTitle: "Concept, Design",
    image: "/testingHero.jpg",
    likes: 0,
    description:
      "Making this project we were inspired by modern trends in the development of motorsport in the desire to create a perfect, fast and recognizable silhouette. Every line, every bend has been thought out to the smallest detail to fit perfectly into the overall concept. Also, we tried to take into account all engineering requirements and constraints.",
    slug: "skhand-concept",
  },
  {
    title: "Skhand Concept",
    subTitle: "Concept, Design",
    image: "/testingHero.jpg",
    likes: 0,
    description:
      "Making this project we were inspired by modern trends in the development of motorsport in the desire to create a perfect, fast and recognizable silhouette. Every line, every bend has been thought out to the smallest detail to fit perfectly into the overall concept. Also, we tried to take into account all engineering requirements and constraints.",
    slug: "skhand-concept",
  },
  {
    title: "Skhand Concept",
    subTitle: "Concept, Design",
    image: "/testingHero.jpg",
    likes: 0,
    description:
      "Making this project we were inspired by modern trends in the development of motorsport in the desire to create a perfect, fast and recognizable silhouette. Every line, every bend has been thought out to the smallest detail to fit perfectly into the overall concept. Also, we tried to take into account all engineering requirements and constraints.",
    slug: "skhand-concept",
  },
];

export default function Book() {
  const pathname = usePathname();
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
          <h1>Skhand Padhbb</h1>
          <p>Basic Understanding</p>
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
                  href={`/document/${content.slug}`}
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
