/**
 * @file webpack config
 * @author hushicai(bluthcy@gmail.com)
 */

var path = require('path');

module.exports = {
    entry: './asset/test',
    output: {
        path: path.join(__dirname, 'build/webpack'),
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            zrender: './submodule/zrender/src',
            echarts: './submodule/echarts/src'
        }
    }
};
