/**
 * @file webpack config
 * @author hushicai(bluthcy@gmail.com)
 */

var path = require('path');

// var Alias = {
    // ECHARTS: path.resolve(__dirname, './submodule/ecomfe/echarts/src'),
    // ZRENDER: path.join(__dirname, './submodule/ecomfe/zrender/src')
// };

module.exports = {
    context: __dirname,
    entry: './webpack/entry.js',
    output: {
        path: path.join(__dirname, 'webpack'),
        filename: 'build.js'
    },
    resolve: {
        root: './node_modules'
        // alias: {
            // echarts: Alias.ECHARTS,
            // zrender: Alias.ZRENDER
        // }
    },
    // plugins: [
        // {
            // apply: function (compiler) {
                // compiler.resolvers.normal.plugin('module', function (request, callback) {
                    // var moduleName = request.request;
                    // console.log(moduleName);
                    // if (moduleName === 'echarts'
                        // || moduleName === 'zrender'
                    // ) {
                        // var obj = {
                            // path: Alias[moduleName.toUpperCase()] + '/' + moduleName + '.js',
                            // file: true,
                            // resolved: true
                        // };
                        // callback(null, obj);
                    // }
                    // else {
                        // callback();
                    // }
                // });
            // }
        // }
    // ]
};
