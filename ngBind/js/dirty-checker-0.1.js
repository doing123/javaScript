// 双向数据绑定
window.onload = function () {
    'use strict';

    // $scope 作用域对象，保存绑定的值
    var scope = {
        increase: function () {
            this.data++;
        },
        decrease: function () {
            this.data--;
        },
        data: 0
    };

    // 绑定click事件，当点击时执行ng-click属性绑定的函数
    function bind() {
        var list = document.querySelectorAll('[ng-click]');
        for (var i = 0, l = list.length; i < l; i++) {
            // 绑定原生click事件
            list[i].onclick = (function (index) {
                return function () {
                    var func = this.getAttribute('ng-click');
                    scope[func](scope); // view->model
                    apply(); // model->view
                }
            })(i);
        }
    }

    // 更新ng-bind绑定的对应值
    function apply() {
        var list = document.querySelectorAll('[ng-bind]');
        for (var i = 0, l = list.length; i < l; i++) {
            var bindData = list[i].getAttribute('ng-bind');
            list[i].innerHTML = scope[bindData];
        }
    }
    bind();
    apply();
};