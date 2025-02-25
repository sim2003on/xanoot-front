const nextConfig = {
  env: {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    API_DOMAIN: process.env.API_DOMAIN,
    SERVER_URL: process.env.SERVER_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.SERVER_URL}/uploads/:path*`
      }
    ];
  }
};

export default nextConfig;
