// new Compile(options.el, this);
function Compile(el, vm) { // vm -> this -> new Vue的实例
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if(this.el){
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function (el) { // 创建文档片段
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while(child){
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileElement: function (el) { // 编译文档片段
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function (node) { // 遍历该文档片段所有子节点
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;

            if(self.isElementNode(node)){ // 元素节点
                self.compile(node);
            } else if(self.isTextNode(node) && reg.test(text)){ // 文本节点
                self.compileText(node, reg.exec(text)[1]);
            }

            if(node.childNodes && node.childNodes.length){ // 递归该子节点的子节点元素
                self.compileElement(node);
            }
        });
    },
    compile: function (node) { // 编译元素节点
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function (attr) { // 遍历该节点所有属性
            var attrName = attr.name;
            if(self.isDirective(attrName)){ // 指令节点 ‘v-’
                var exp = attr.value; // 属性值
                var dir = attrName.substring(2); // 去除 ‘v-’
                if(self.isEventDirective(dir)){ // 事件指令 v-on:click
                    self.compileEvent(node, self.vm, exp, dir);
                } else { // v-model 指令
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function (node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    },
    compileEvent: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];

        if(eventType && cb){
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compileModel: function (node, vm, exp, dir) { // v-model：双向数据绑定
        var self = this;
        var val = this.vm[exp]; // this.vm = vm
        this.modelUpdater(node, val); // input输入框赋值v-model属性值对应的值
        new Watcher(this.vm, exp, function (value) { // 实例化一个监听器
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if(val === newValue){
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    updateText: function (node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value === 'undefined' ? '' : value; // 节点对象赋值：v-model所绑定的值
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') === 0;
    },
    isEventDirective: function (dir) {
        return dir.indexOf('on:') === 0;
    },
    isElementNode: function (node) {
        return node.nodeType === 1;
    },
    isTextNode: function (node) {
        return node.nodeType === 3;
    }
};
