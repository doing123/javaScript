function Vue(options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
    // 数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

Vue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, { // this.data对象里的属性和值，赋值到this上，即new Vue()实例上
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            }
        });
    }
};
