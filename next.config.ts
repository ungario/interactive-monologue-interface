import { NextConfig } from 'next';

const isStaticExport = process.env.NEXT_OUTPUT_EXPORT === '1';

const nextConfig: NextConfig = isStaticExport
    ? {
          output: 'export',
          images: {
              unoptimized: true,
          },
      }
    : {};

export default nextConfig;
