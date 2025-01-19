import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Page Not Found - SatyaTatva</title>
        <meta
          name="description"
          content="The page you’re looking for does not exist. Explore the wisdom of Sanatan Dharma with SatyaTatva."
        />
      </Head>
      <div className="not-found">
        <div className="title-404">Oops! Page not Found.</div>
        <div className="subheading-404">
          <p>
            Something went wrong, and we cannot find the page you are looking
            for.
          </p>
          <p>You can return to the previous page or the Home Page.</p>
        </div>
        <div className="buttons-404">
          <div className="goback-404 hover" onClick={() => router.back()}>
            <IoIosArrowBack />
            Return Back
          </div>
          <Link className="gohome-404 hover" href={"/"}>
            Go to Home
            <FaHome />
          </Link>
        </div>
      </div>
    </>
  );
}
