/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: `${process.env.NEXT_PUBLIC_API_URL}`,
        port: "5000",
      },
    ],
  },
};

export default nextConfig;
