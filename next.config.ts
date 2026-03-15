import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com"
      },
    ]
  }
};
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig);
