const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
        },
      },
    },
  },
});

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/<ваше-имя>.github.io/'
    : '/'
}