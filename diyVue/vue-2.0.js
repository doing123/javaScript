(function (global, factory) {
    global.Vue = factory();
})(this, function () {
    // 默认配置
    var DEFAULT = {
        elem: 'body', // vue要管理的DOM结构
        data: {} // 保存的数据监听对象
    };

    /**
     * 扫描 节点劫持 model数据对象 数据监听 data
     * @param node
     * @param vm
     */
    function compile(node, vm) {
        // 指令 v- 模板引擎 {{}}
        var reg = /\{\{(.*)\}\}/;
        // 集合[]  v-  nodeType来判断
        // 1:element 2：Attribute 3：text 8：comment 9：document 11：documentFragment
        if (node.nodeType === 1) {
            var attr = node.attributes;
            for (var i = 0; i < attr.length; i++) {
                if (attr[i].nodeName === 'v-model') {
                    var name = attr[i].nodeValue;
                    node.value = vm.data[name];
                }
            }
            // 继续递归其子元素，全部扫描
            var childNodes = node.childNodes;
            for(var i=0;i<childNodes.length;i++){
                compile(childNodes[i], vm);
            }
        }
        if (node.nodeType === 3) {
            if (reg.test(node.nodeValue)) {
                var name = RegExp.$1.trim(); // 获取表达式:{{xxxx}}中的‘xxxx’
                node.nodeValue = vm.data[name];
            }
        }
    }

    function createNode(obj, vm) { // vm:vue instance
        var flag = document.createDocumentFragment();
        var child;
        while (child = obj.firstChild) {
            // 扫描(compile)，节点劫持
            compile(child, vm);
            // 会把child从document.getElementById(this.elem)获得DOM结构中移除插入到flag文档片段中，导致obj.firstChild的一直改变
            flag.appendChild(child);
        }
        return flag;
    }

    var Vue = function (options) {
        // 默认配置为优先，用户设置可覆盖
        this.extend(this, DEFAULT, options);
        var dom = createNode(document.getElementById(this.elem), this);
        document.getElementById(this.elem).appendChild(dom);
        this.observer(this.data, this);
    };

    Vue.prototype = {
        extend: function () {
            for (var i = 0; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    this[key] = arguments[i][key];
                }
            }
        },
        recursive: function (vm, obj, key, value) {
            this.observer(value, vm);
        },
        observer: function (obj, vm) { // 数据监听，递归
            if (typeof obj !== 'Object') {
                return
            }
            Object.keys(obj).forEach(function (key) { // key:对象属性
                // 递归对象，过滤
                this.recursive(vm, obj, key, obj[key]);
            });
            var app = document.getElementById('app'); // todo: 根据用户配置获取相应DOM元素
            // 只给input元素绑定事件
            var elems = app.querySelectorAll('input[v-model]');
            var _this = this;
            for (var i = 0; i < elems.length; i++) {
                elems[i].oninput = function () {
                    // input事件触发值改变 -> defineProperty中的set方法
                    _this.data[this.getAttribute('v-model')] = this.value;
                }
            }

            for (var key in this.data) {
                var elems = app.querySelectorAll('[v-model=' + key + ']');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].value = this.data[key];
                    elems[i].innerText = this.data[key];
                }

                /**
                 * 留住 key
                 * @param  {[type]} key [description]
                 * @return {[type]}     [description]
                 */
                (function (key) {
                    Object.defineProperty(_this.data, key, {
                        get: function () {
                            return this.str;
                            console.log(this.str);
                        },
                        set: function (val) {
                            var selector = '[v-model=' + key + ']';
                            var elems = app.querySelectorAll(selector);
                            for (var i = 0; i < elems.length; i++) {
                                elems[i].value = val;
                                elems[i].innerText = val;
                            }
                            this.str = val;
                            console.log(key);
                        }
                    });
                })(key);

            }
        }
    };

    return Vue;
});