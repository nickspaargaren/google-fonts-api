/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      } ];
  },
};
