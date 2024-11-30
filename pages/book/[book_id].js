import { bookMap } from "@/lib/storage";
import classes from "@/styles/book.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookMain() {
  const router = useRouter();
  const book_id = router.query.book_id;

  const [pageData, setPageData] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    async function fetchData(path) {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: 1, filePath: path }),
      });
      const data = await res.json();
      if (data.images) {
        data.images.forEach((base64Image, index) => {
          const img = document.createElement("img");
          img.src = `data:image/jpeg;base64,${base64Image}`;
          img.alt = `Page ${1 + index}`;
          const container = document.getElementById("images");
          container.appendChild(img);
        });
      } else {
        console.error("Failed to fetch images:", data.error);
      }
      // const { totalPages, pagesText } = data;
      // setTotalPages(totalPages);
      // setPageData(pagesText || "");
      // setPageNo(1);
    }

    const path = bookMap[book_id];
    if (path) {
      fetchData(path);
    }
  }, []);

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Book Main</h1>
      <div className={classes.bookContent}>
        {pageData}
        <br />
        <br />
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div id="images"></div>
          {pageNo}
          <br />
          {totalPages}
        </div>
      </div>
    </div>
  );
}
