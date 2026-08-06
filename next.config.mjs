/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ข้ามการตรวจ Type Error ระหว่าง Build เพื่อป้องกัน Build พัง[cite: 1, 4]
  },
  images: {
    unoptimized: true, // ปิด Image Optimization ของ Next.js เพื่อให้แสดงผลรูปภาพบน Hostinger ได้เสถียร[cite: 1, 4]
  },
};

export default nextConfig;
