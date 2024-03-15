const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy middleware for List of Users API
  app.use('/api/chatSystem/users/list', createProxyMiddleware({
    target: 'http://13.212.255.177',
    changeOrigin: true,
  }));

  // Proxy middleware for List of Groups API
  app.use('/api/chatSystem/groups/list', createProxyMiddleware({
    target: 'http://13.212.255.177',
    changeOrigin: true,
  }));

  // Proxy middleware for List of Chats API
  app.use('/api/chatSystem/chat/list', createProxyMiddleware({
    target: 'http://13.212.255.177',
    changeOrigin: true,
  }));

  // Proxy middleware for Get Chat by user id API
  app.use('/api/chatSystem/chatByUserId', createProxyMiddleware({
    target: 'http://13.212.255.177',
    changeOrigin: true,
    pathRewrite: {
      '^/api/chatSystem/chatByUserId': '/api/chatSystem/chatByUserId',
    },
  }));

  // Proxy middleware for Add New Chat API
  app.use('/api/chatSystem/chat/add', createProxyMiddleware({
    target: 'http://13.212.255.177',
    changeOrigin: true,
  }));

  // Proxy middleware for Get User Details by user id API
  app.use('/api/chatSystem/user/:userId', createProxyMiddleware({
    target: 'http://13.212.255.177',
    changeOrigin: true,
    pathRewrite: {
      '^/api/chatSystem/user': '/api/chatSystem/user',
    },
  }));
};
