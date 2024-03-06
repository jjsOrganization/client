const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        ["/api", "/seller/info"],
        createProxyMiddleware( {
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    );
};
