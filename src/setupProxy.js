const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'http://123.56.149.216:8080/api',
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  )
  app.use(
    "/auth",
    createProxyMiddleware({
      target: 'http://123.56.149.216:8080/auth',
      changeOrigin: true,
      pathRewrite: {
        "^/auth": ""
      }
    })
  )
}