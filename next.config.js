/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_MAPBOX_TOKEN: process.env.NEXT_MAPBOX_TOKEN
  }
}

module.exports = nextConfig
