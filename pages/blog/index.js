import FooterMain from "@/components/footer/footerMain";
import classes from "@/styles/blog.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

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

const recentPosts = [
  {
    title: "The Pure Innocence",
    date: "January 11, 2022",
  },
  {
    title: "Furniture Design",
    date: "January 11, 2022",
  },
  {
    title: "UX/UI",
    date: "January 11, 2022",
  },
  {
    title: "Alliance",
    date: "January 11, 2022",
  },
  {
    title: "Midnight Neon",
    date: "January 11, 2022",
  },
  {
    title: "New Light Equipment",
    date: "January 11, 2022",
  },
];

const categories = ["Design", "News & Updates", "Our Studio", "Photography"];

const tags = [
  "backstage",
  "concept",
  "design",
  "info",
  "news",
  "photo",
  "review",
  "stories",
  "studio",
  "work",
];

export default function Blog() {
  const pathname = usePathname();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.main}>
          {contentDetails.map((content, idx) => (
            <div className={classes.contentMain} key={idx}>
              <div className={classes.contentMainDetails}>
                <div className={classes.contentTitleDetails}>
                  <div className={`${classes.contentMainImg} hover`}>
                    <Image
                      width={75}
                      height={75}
                      src={content.image}
                      alt={content.title}
                    />
                  </div>
                  <div className={classes.contentSubTitleDetails}>
                    <div className={`${classes.contentTitle} hover`}>
                      {content.title}
                    </div>
                    <div className={classes.contentSubTitle}>
                      {content.subTitle}
                      <span></span>
                      {content.likes} Likes
                    </div>
                  </div>
                </div>
                <div className={classes.contentDescriptionDetails}>
                  <div className={classes.contentDescription}>
                    {content.description}
                  </div>
                  <Link
                    className={`${classes.contentMore} hover`}
                    href={`/shlok/${content.slug}`}
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
        <div className={classes.side}>
          <label className={`${classes.searhBar} hover`} htmlFor="searchBlog">
            <input
              id="searchBlog"
              type="text"
              placeholder="Search the site..."
            />
            <IoSearch />
          </label>
          <div className={classes.recentPost}>
            <div className={classes.recentHeading}>Recent Posts</div>
            <div className={classes.recentHoverPosts}>
              {recentPosts.map((post, idx) => (
                <div className={classes.recentHoverPost} key={idx}>
                  <div className={`${classes.recentHoverPostHead} hover`}>
                    {post.title}
                  </div>
                  <div className={classes.recentHoverPostDate}>{post.date}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.recentPost}>
            <div className={classes.recentHeading}>Categories</div>
            <div className={classes.optionMainLinks}>
              {categories.map((category, idx) => (
                <div className={`${classes.optionMainLink} hover`} key={idx}>
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.recentPost}>
            <div className={classes.recentHeading}>Tag Cloud</div>
            <div className={classes.recentHoverTags}>
              {tags.map((tag, idx) => (
                <div className={`${classes.recentHoverTag} hover`} key={idx}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </>
  );
}
