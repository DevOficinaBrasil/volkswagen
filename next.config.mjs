/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placehold.co',
        },
        {
          protocol: 'https',
          hostname: 'w7.pngwing.com',
        },
        {
          protocol: 'https',
          hostname: 'p2.trrsf.com',
        }
      ],
    },
};

export default nextConfig;
