module.exports = {devServer: {
    //proxy: 'https://image.tmdb.org/',
    },
    configureWebpack: {
      devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    }
  };