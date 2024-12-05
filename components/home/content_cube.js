import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MeteorLoader from "@/reuse/loader/meteor";

export default function ContentCube({ classes, item, enable }) {
  const [loading, setLoading] = useState(true);
  return (
    <Link
      className={`${classes.mostVisitedSingle} hover`}
      href={item.link}
      onClick={(e) => {
        if (!enable) {
          e.preventDefault();
        }
      }}
    >
      <div className={classes.cubeImage}>
        {loading && <MeteorLoader />}
        <Image
          src={item.img}
          alt={item.name}
          fill={true}
          priority={true}
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className={classes.smallDetails}>
        <div className={classes.smallTitle}>{item.name}</div>
        <div className={classes.smallDetail}>{item.detail}</div>
      </div>
    </Link>
  );
}
