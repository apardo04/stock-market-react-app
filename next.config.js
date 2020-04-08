require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withLess = require('@zeit/next-less');
const lessToJs = require('less-vars-to-js');
const withCSS = require('@zeit/next-css');
const fs = require('fs');

// Where the antd.custom.less varaiables lives
const themeVariables = lessToJs(
    fs.readFileSync(
        path.resolve(__dirname, "./app/assets/less/antd-custom.less"),
        "utf8"
    )
);

// fix errors when the less files are required by node, ie: server
if(typeof require !== 'undefined') {
    require.extensions[".less"] = file => {};
    require.extensions[".css"] = (file) => {};
}

module.exports = withCSS(withLess({
    lessLoaderOptions:  {
        javascriptEnabled: true,
        modifyVars: themeVariables
    },
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }
      config.plugins = config.plugins || [];
    
      config.plugins = [
        ...config.plugins,
  
        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      })
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]
  
        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
      }
      return config
    },
}))