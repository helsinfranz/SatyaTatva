import Cursor from "@/components/cursor";
import classes from "./layout.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function Layout({ children }) {
  return (
    <>
      <Cursor />
      <main className={classes.main}>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
