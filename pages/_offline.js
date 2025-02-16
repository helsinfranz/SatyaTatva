import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default function OfflinePage() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>You're Offline! - SatyaTatva</title>
                <meta
                    name="description"
                    content="The page you’re looking for is not available offline."
                />
            </Head>
            <div className="not-found">
                <div className="title-404">You're Offline!</div>
                <div className="subheading-404">
                    <p>
                        It looks like you're not connected to the internet. Some features may not be available.
                    </p>
                    <p>You can Checking your internet connection or return to the Home Page.</p>
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
