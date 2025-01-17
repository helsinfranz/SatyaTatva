import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          href="https://decex.app/images/decex_dp_192.png"
        ></link>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DeceX" />
        {/* <meta name="theme-color" content="#333333" /> */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="author" content="DeceX"></meta>
        <meta
          property="twitter:image"
          content="https://www.decex.app/images/decex_black_raw.png"
        ></meta>
        <meta property="twitter:domain" content="decex.app"></meta>
        <meta name="twitter:url" content="https://www.decex.app" />
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content="DeceX Corp."></meta>
        <meta
          property="twitter:description"
          content="DeceX is a decentralized and anonymous platform for discussions and interactions, ensuring privacy and security for users."
        ></meta>
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.decex.app/images/decex_black_raw.png"
        ></meta>
        <meta property="og:title" content="DeceX Corp."></meta>
        <meta property="og:site_name" content="DeceX Corp." />
        <meta
          property="og:description"
          content="DeceX is a decentralized and anonymous platform for discussions and interactions, ensuring privacy and security for users."
        />
        <meta property="og:url" content="https://www.decex.app/"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
