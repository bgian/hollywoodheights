import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/culture",
        destination: "/residents",
        permanent: true,
      },
      {
        source: "/donate",
        destination:
          "https://www.zeffy.com/en-US/donation-form/donate-to-hollywood-heights-association",
        permanent: false,
      },
      {
        source: "/unhoused-response",
        destination: "/contact#unhoused-response",
        permanent: false,
      },
      {
        source: "/hiho-community-pet-network",
        destination: "/residents#hiho-pets",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
