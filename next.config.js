/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone', // For Vercel serverless functions
  images: {
    domains: ['i.imgur.com'], // Add your image domains
  },
  experimental: {
    serverActions: true, // Enable if using Next.js 13+
  }
  }
