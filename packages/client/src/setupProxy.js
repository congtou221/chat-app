const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/graphql', {
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/graphql': '/graphql',
      },
    }),
    createProxyMiddleware('/socket.io', {
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/socket.io': '/socket.io',
      },
    }),
  );
};

