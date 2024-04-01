module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        dns: false,
        tls: false,
        assert: false,
        process: false,
      };
    }
    return config;
  },
  sentry: {
    hideSourceMaps: true,
  },
};
