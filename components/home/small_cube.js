import MeteorLoader from "@/reuse/loader/meteor";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SmallCube({ classes, item }) {
  const [loading, setLoading] = useState(true);
  return (
    <Link className={classes.quoteSmall} href={item.link}>
      <div className={classes.quoteImage}>
        {loading && <MeteorLoader />}
        <Image
          src={item.img}
          alt={item.name}
          fill={true}
          priority={true}
          sizes="35vw"
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
