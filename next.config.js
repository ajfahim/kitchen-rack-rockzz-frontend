/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backend_url: "http://localhost:5000/api",
  },
};

module.exports = nextConfig;
