/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://bit.ly/2Z4KKcF', 'https://bit.ly/', 'bit.ly'],
  },
}

module.exports = nextConfig
