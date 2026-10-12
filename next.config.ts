import type { NextConfig } from "next";

if (!process.env.__NEXT_PRIVATE_ORIGIN) {
  process.env.__NEXT_PRIVATE_ORIGIN = `http://127.0.0.1:${process.env.PORT || 3000}`;
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "18mb",
      allowedOrigins: [
        "aliceblue-octopus-220131.hostingersite.com",
        "*.hostingersite.com",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
