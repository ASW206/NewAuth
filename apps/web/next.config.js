/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
      {
        protocol:"https",
        hostname:"**",
      }
    ]
  }
  // experimental: {
  //   // turbo: true, // Disable if causing issues
  //   serverComponentsExternalPackages: ["@prisma/client", "@auth/prisma-adapter"],
  // },
};

export default nextConfig;
