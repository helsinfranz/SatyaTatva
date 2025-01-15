/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
};

const withPWA = nextPWA({
  dest: "public",
  mode: "production",
  disable: process.env.NEXTAUTH_URL === "http://localhost:3000",
  register: true,
  skipWaiting: true,
  // cacheOnFrontEndNav: true,
  // dynamicStartUrl: false,
  // runtimeCaching: [
  //   // Cache HTML pages with a network-first strategy for offline fallback
  //   {
  //     urlPattern: /^\/.*$/,
  //     handler: "NetworkFirst",
  //     options: {
  //       cacheName: "html-cache",
  //       networkTimeoutSeconds: 10, // Try network for 10 seconds before fallback to cache
  //       expiration: {
  //         maxEntries: 50, // Maximum 50 cached HTML pages
  //         maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
  //       },
  //     },
  //   },
  //   // Cache images and static assets with cache-first strategy
  //   {
  //     urlPattern: /\/.*\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
  //     handler: "CacheFirst",
  //     options: {
  //       cacheName: "image-cache",
  //       expiration: {
  //         maxEntries: 200, // Maximum 200 cached images
  //         maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
  //       },
  //     },
  //   },
  //   // Cache static assets like CSS, JS with stale-while-revalidate strategy
  //   {
  //     urlPattern: /\/_next\/static\/.*/,
  //     handler: "StaleWhileRevalidate",
  //     options: {
  //       cacheName: "static-cache",
  //       expiration: {
  //         maxEntries: 100, // Maximum 100 cached static files
  //         maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
  //       },
  //     },
  //   },
  // ],
  // maximumFileSizeToCacheInBytes: 3000000,
})(nextConfig);

export default withPWA;
