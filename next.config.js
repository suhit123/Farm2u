const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['user-images.githubusercontent.com'],
  },
  env: {
    VERCEL_URL: process.env.VERCEL_URL,
  }
};

module.exports = nextConfig;
