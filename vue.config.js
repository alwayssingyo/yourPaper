const { defineConfig } = require('@vue/cli-service');
const ansiRegex = require('ansi-regex');
const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'client/src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'YOUR Paper',
    }
  },
  transpileDependencies: true,
  devServer: {
    proxy : {
        '/naver':{
          "target":'https://openapi.naver.com/v1/search/adult?query=""',
          "pathRewrite":{'^/':''},
          "changeOrigin":true,
          "secure":false
      }
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    },
    historyApiFallback: true
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/css/common.scss";
        `
      }
    }
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    resolve: {
      fallback: {
        fs: false,
        child_process: false,
        net: false,
        tls: false
      },
      alias: {
        '@': path.join(__dirname, 'client/src/')
      }
    }
  },
  lintOnSave:false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : ""
})
