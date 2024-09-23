/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pixels.com',
            }
        ]
    }
};

export default nextConfig;
