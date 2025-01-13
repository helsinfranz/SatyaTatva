/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
};

const withPWA = nextPWA({
  dest: "public",
  mode: "production",
  // disable: process.env.NEXTAUTH_URL === "http://localhost:3000",
  register: true,
  skipWaiting: true,
  // maximumFileSizeToCacheInBytes: 3000000,
})(nextConfig);

export default withPWA;
