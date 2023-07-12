/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        backend_url:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:5000/api'
                : 'https://kitchen-rack-rockzz-backend-dev.vercel.app/api',
    },
};

module.exports = nextConfig;
