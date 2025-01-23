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
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SatyaTatva" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="author" content="SatyaTatva" />
        <meta
          property="twitter:image"
          content="/logos/SatyaTatva_FI.png"
        ></meta>
        <meta property="twitter:domain" content="satyatatva.com"></meta>
        <meta name="twitter:url" content="https://www.satyatatva.com" />
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content="SatyaTatva"></meta>
        <meta
          property="twitter:description"
          content="Explore the wisdom of Sanatan Dharma through Vedas, Upanishads, Puranas, Shlokas, and much more."
        ></meta>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Satya Tatva" />
        <meta
          property="og:title"
          content="SatyaTatva - Discover Vedas, Puranas, Upanishads, and Much More"
        />
        <meta
          property="og:description"
          content="Explore the wisdom of Sanatan Dharma through Vedas, Upanishads, Puranas, and sacred shlokas in an engaging UI."
        />
        <meta property="og:image" content="/logos/SatyaTatva_FI.png"></meta>
        <meta property="og:url" content="https://www.satyatatva.com"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
