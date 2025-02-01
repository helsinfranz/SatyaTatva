import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  mode: "production",
  disable: process.env.NEXTAUTH_URL === "http://localhost:3000",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/(www\.)?satyatatva\.com\/.*$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days (tweek it according to the use )
        },
        cacheableResponse: {
          statuses: [200],
        },
      },
    },
    {
      urlPattern: /.*\.(?:css|js|png|jpg|jpeg|svg|webp|woff2|ttf)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [200],
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
