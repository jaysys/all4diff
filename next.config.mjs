// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["picsum.photos"], // Add 'picsum.photos' to the allowed domains
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
