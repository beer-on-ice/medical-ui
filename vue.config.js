module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.jsx', '.less', '.css']
    }
  },
  devServer: {
    port: 8088
  }
}
