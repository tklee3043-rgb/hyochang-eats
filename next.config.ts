import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 제목·설명 같은 메타데이터를 본문이 아니라 <head>에 바로 넣어요(검색·공유 미리보기용).
  htmlLimitedBots: /.*/,
  // 기본 언어는 영어: "/" 로 들어오면 "/en" 으로 보내요.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
