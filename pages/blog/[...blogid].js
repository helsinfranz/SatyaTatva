import FooterMain from "@/components/footer/footerMain";
import classes from "@/styles/blog.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const tags = ["info", "news", "work"];

export default function BlogMain() {
  // Do remove after blog completion.
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/");
  }
  return <></>;
  // Do remove after blog completion.
  return (
    <div className={classes.blogMain}>
      <div className={classes.container2}>
        <div className={classes.main} style={{ border: "none" }}>
          <div className={classes.contentMain} style={{ paddingRight: "0" }}>
            <div
              className={`${classes.contentMainDetails} ${classes.smallScreen}`}
              style={{ gap: "5rem" }}
            >
              <div className={classes.contentTitleDetails}>
                <div className={classes.contentMainImg}>
                  <Image
                    width={75}
                    height={75}
                    src={"/testingHero.png"}
                    alt={"Skhand Concept"}
                  />
                </div>
                <div className={classes.contentSubTitleDetails}>
                  <div
                    className={classes.contentTitle}
                    style={{
                      fontSize: "2.4rem",
                      fontWeight: "700",
                      opacity: "0.9",
                    }}
                  >
                    Skhand Concept
                  </div>
                  <div
                    className={classes.contentSubTitle}
                    style={{ fontWeight: "400", opacity: "0.6" }}
                  >
                    Concept, Design
                    <span></span>
                    12 Likes
                  </div>
                </div>
              </div>
              <div className={classes.contentDescriptionDetails}>
                <div
                  className={classes.contentDescription}
                  style={{ fontWeight: "400", opacity: "0.65" }}
                >
                  Making this project we were inspired by modern trends in the
                  development of motorsport in the desire to create a perfect,
                  fast and recognizable silhouette. Every line, every bend has
                  been thought out to the smallest detail to fit perfectly into
                  the overall concept. Also, we tried to take into account all
                  engineering requirements and constraints.Making this project
                  we were inspired by modern trends in the development of
                  motorsport in the desire to create a perfect, fast and
                  recognizable silhouette. <br />
                  <br />
                  Every line, every bend has been thought out to the smallest
                  detail to fit perfectly into the overall concept. Also, we
                  tried to take into account all engineering requirements and
                  constraints.Making this project we were inspired by modern
                  trends in the development of motorsport in the desire to
                  create a perfect, fast and recognizable silhouette. Every
                  line, every bend has been thought out to the smallest detail
                  to fit perfectly into the overall concept. Also, we tried to
                  take into account all engineering requirements and
                  constraints.
                </div>
              </div>
              <div className={classes.recentHoverTags}>
                {tags.map((tag) => (
                  <Link
                    className={`${classes.recentHoverTag} hover`}
                    href={`/blog?tag=${tag}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
}
