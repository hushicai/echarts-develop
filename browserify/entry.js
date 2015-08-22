/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

(function (global) {

    // browserify可以打包node_modules/echarts/dist/echarts-all.js
    // 对于node_modules/echarts/source/echarts-all.js，需要添加额外的参数
    // `browerify entry.js -o bundle.js --im`
    // 用于忽略echarts-all.js中的require调用，否则会报"模块找不到错误"

    // var echarts = require('echarts').echarts;

    require('echarts-all');

    // browserify怎么打包amd模块呢？
    // 打包后，报define未定义错误，需要引入一个模块加载器
    // 但是require被browserify重写了，所以无法require到echarts对象
    var echarts = require('echarts-without-esl/dist/echarts');
    require('echarts-without-esl/dist/chart/line');
    // 那就需要将amd模块转成commonjs
    // browserify有个deamdify可以转换
    // `browserify -t deamdify browserify/entry.js -o browserify/bundle.js`
    // 但很遗憾，我们打包的文件中，存在多个define，所以也无法正常工作。

    console.log(echarts);

    return;

    // var el = document.getElementById('test');
    // var ec = echarts.init(el);

    // ec.setOption({
        // title: {
            // text: 'test'
        // },
        // xAxis: [
            // {
                // type: 'category',
                // boundaryGap: false,
                // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            // }
        // ],
        // yAxis: [
            // {
                // type: 'value',
                // axisLabel: {
                    // formatter: '{value} °C'
                // }
            // }
        // ],
        // series: [
            // {
                // name: 'test',
                // type: 'line',
                // data: [1, 2, 3]
            // }
        // ]
    // });

})(this);
