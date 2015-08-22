(function (modules) {
    function r(m) {}

    // 入口
    return r('echarts/echarts');
})(
    {
        'echarts/echarts': function (require, module, exports) {},
        'echarts/config': function (require, module, exports) {},
        'echarts/component': function (require, module, exports) {}
    }
);
