/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/ai-travel-chat',
        destination: 'http://ai-service:5000/api/ai-travel-chat',
      },
    ]
  },
}

module.exports = nextConfig
