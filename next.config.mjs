/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "www.changsaone.com",
        pathname: "/assets/img/**", // Allows all images in this directory
      },
    ],
  },
};

export default nextConfig;
