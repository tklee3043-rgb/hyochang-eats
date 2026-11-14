import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기본 언어는 영어: "/" 로 들어오면 "/en" 으로 보내요.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
