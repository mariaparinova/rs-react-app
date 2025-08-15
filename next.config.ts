/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
