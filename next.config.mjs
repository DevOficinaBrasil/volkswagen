/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
      },
      {
        protocol: "https",
        hostname: "p2.trrsf.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "www.noticiasdaoficinavw.com.br",
      },

      {
        protocol: "https",
        hostname: "oficinabrasil.com.br",
      },
      {
        protocol: "https",
        hostname: "www.oficinabrasil.com.br",
      },
      {
        protocol: "https",
        hostname: "uploads.vw-mms.de",
      }
    ],
  },
};

export default nextConfig;
