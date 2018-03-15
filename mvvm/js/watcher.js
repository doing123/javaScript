/**
 * new Watcher(this.vm, exp, function (value) { // 实例化一个监听器，vm对象新增一个属性名为：v-model绑定的属性值
 *           self.modelUpdater(node, value);
 *      });
 */
function Watcher(vm, exp, cb) { // exp 为 属性v-model的值
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); // 将自己添加到订阅器
}

Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function () {
        Dep.target = this;
        // 取值查询操作，强制执行监听器里的get函数，获得v-model属性值所对应的实例化vue的data里的值
        // 即 observer.js里20行的getter操作
        // 同时把new Watcher 实例自身存入dep.addSub(Dep.target);
        var value = this.vm.data[this.exp];
        Dep.target = null;
        return value;
    }
};
