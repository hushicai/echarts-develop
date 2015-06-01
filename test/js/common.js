/**
 * @file common
 * @author hushicai(bluthcy@gmail.com)
 */

define(
    function (require) {
        var exports = {};

        exports.getElement = function (id) {
            id = id || 'test';
            return document.getElementById(id);
        };

        exports.createElement = function (styles) {
            styles = styles || {};
            var el = document.createElement('div');
            el.id = 'test';
            el.style.width = styles.width || 800 + 'px';
            el.style.height = styles.height || 400 + 'px';
            document.body.insertBefore(el, document.body.firstChild);
            return el;
        };
    }
);
