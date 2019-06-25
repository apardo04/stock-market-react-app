require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withLess = require('@zeit/next-less');
const lessToJs = require('less-vars-to-js');
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
}

module.exports = withLess({
    lessLoaderOptions:  {
        javascriptEnabled: true,
        modifyVars: themeVariables
    },
    webpack: config => {
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
    
        return config
      }
})