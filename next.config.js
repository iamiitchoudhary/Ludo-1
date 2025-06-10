/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core Settings
  reactStrictMode: true,
  output: 'standalone', // Optimized for Vercel
  productionBrowserSourceMaps: true, // Better error debugging

  // Image Optimization
  images: {
    domains: [
      'firebasestorage.googleapis.com', // Firebase Storage
      'lh3.googleusercontent.com',     // Google Auth
      'i.imgur.com',                   // Tournament banners
      'your-cdn-domain.com'            // Add your custom domains
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 1 day cache
  },

  // Performance Optimizations
  experimental: {
    optimizePackageImports: [ // Tree-shaking
      'react-icons',
      '@fortawesome/react-fontawesome',
      'firebase/*'
    ],
    serverComponentsExternalPackages: [
      '@react-google-maps/api',
      'react-slick'
    ],
  },

  // Security Headers (Added by default)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  },

  // Webpack Overrides for Firebase
  webpack: (config, { isServer }) => {
    // Firebase compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      'firebase/app': require.resolve('firebase/app'),
      'firebase/auth': require.resolve('firebase/auth'),
      'firebase/firestore': require.resolve('firebase/firestore'),
      'firebase/storage': require.resolve('firebase/storage')
    };

    // SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

// Security Headers Configuration
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  }
];

module.exports = nextConfig;
