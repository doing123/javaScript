
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function (data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter() {
                if (Dep.target) { // Dep.target = new Watcher 实例
                    dep.addSub(Dep.target); // 把watcher实例本身添加进new Dep()实例
                }
                return val;
            },
            set: function setter(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
};

// observe(this.data);
function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) { // 此处的sub指一个new Watcher的实例
            // run() -> this.cb.call(this.vm, value, oldVal);
            // 执行编译时{{}}文本或v-model元素对应生成的监听器的回调，通过执行modelUpdater/updateText更新页面的值
            sub.update();
        });
    }
};
Dep.target = null;