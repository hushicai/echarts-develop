/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

(function (global) {

    var echarts = require('echarts').echarts;

    var el = document.getElementById('test');
    var ec = echarts.init(el);

    ec.setOption({
        title: {
            text: 'test'
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name: 'test',
                type: 'line',
                data: [1, 2, 3]
            }
        ]
    });

})(this);
