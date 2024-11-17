/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: `${process.env.NEXT_PUBLIC_API_URL}`,
        hostname: 'haatbazaar-data.s3.ap-south-1.amazonaws.com',
        // port: "5000",
      },
    ],
  },
};

export default nextConfig;
