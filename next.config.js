const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.banapresso.com',
      },
    ],
    domains: ['bunnypresso.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
