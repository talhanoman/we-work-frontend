/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const nextConfig = {
  reactStrictMode: false,

  webpack: config => {
    // Optional: Enables reading mapbox token from environment variable
    config.plugins.push(new webpack.EnvironmentPlugin({MapboxAccessToken: ''}));
    return config;
  },

  env: {
    IS_LOCAL:false,
    LIVE_LINK:"http://170.64.154.127:",
    AUTH_PORT:"5005",
    ACCOUNT_PORT:"5002",
  }
}

module.exports = nextConfig
