/** @type {import('next').NextConfig} */
const nextConfig = {
  // optional, but helps silence the workspace warning
  outputFileTracingRoot: __dirname,

  async rewrites() {
    return [
      // map /t → /api/uid-redirect for local dev
      { source: '/t', destination: '/api/uid-redirect' },
    ];
  },
};

module.exports = nextConfig;
