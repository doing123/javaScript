(function (root, factory) {
    // 为了适应同步模块机制以及ES6 import 模块化机制
    if(typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = factory();
    } else{
        root.$ = factory();
    }
})(this, function () {
    var Qjs = {
        type: function (obj) {
            if(obj == null){
                return obj + '';
            }

            return typeof obj === 'object' || typeof obj === 'function'
                ? class2type[Object.prototype.toString.call(obj)]
                || 'object' : typeof obj;
        }
    };

    var class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map(
        function (item, index) {
            class2type['[object ' + item + ']'] = item.toLowerCase();
        }
    );

    return Qjs;
});