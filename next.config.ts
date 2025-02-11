import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode:true,
 swcMinify:true,
 env:{
  PUSHER_APP_ID:'1938698',
  PUSHER_KEY:"57b73c62d5ab9f5c78e4",
  PUSHER_SECRET:"caaf7e27d462b456deb0",
  PUSHER_CLUSTER:"mt1",
 },
};



module.exports = nextConfig;
