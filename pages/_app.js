import Cursor from "@/components/cursor";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Cursor />
      <Component {...pageProps} />
    </>
  );
}
