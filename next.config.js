/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_MAPBOX_TOKEN: process.env.NEXT_MAPBOX_TOKEN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_SUPABASE_ANON_KEY,
    NEXT_SUPABASE_STORAGE_BASEURL: process.env.NEXT_SUPABASE_STORAGE_BASEURL,
    NEXT_PUBLIC_CUSTOMER_APP_URL: process.env.NEXT_PUBLIC_CUSTOMER_APP_URL,
    NEXT_PUBLIC_CUSTOMER_APP_ANON_KEY:
      process.env.NEXT_PUBLIC_CUSTOMER_APP_ANON_KEY,
  },
  images: {
    domains: ["zgkudgezsujgjnqbkbed.supabase.co"],
  },
};

module.exports = nextConfig;
