var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
 entry: './src/tests.js',
 output: {
   path: path.resolve(__dirname, './dist'),
   filename: 'testBundle.js'
},
 target: 'node',
 externals: [nodeExternals()],
 node: {
   fs: 'empty'
 },
 plugins: [
   new WebpackShellPlugin({
     onBuildExit: "mocha --require babel-register ./dist/testBundle.js"
   })
 ]
};