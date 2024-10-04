/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nabsteel.rahkartest.ir",
      },
    ],
  },
};

export default nextConfig;
