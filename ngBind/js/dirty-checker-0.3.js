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
        data: 0,
        faciend: 3 // 倍乘数
    };

    function Scope() { // angular $scope
        this.$$watchList = [];
    }

    // 监听数值变化
    Scope.prototype.$watch = function (name, getNewValue, listener) {
        var watch = {
            name: name, // watch的对象
            getNewValue: getNewValue,
            listener: listener
        };

        this.$$watchList.push(watch);
    };

    Scope.prototype.$digest = function () {
        var dirty = true;
        var checkTime = 0; // 检查的次数，TTL
        while (dirty) {
            dirty = this.$$digestOnce();
            checkTime++;
            if (checkTime > 10 && checkTime) {
                throw new Error('脏检查执行次数过多。');
            }
        }
    };

    Scope.prototype.$$digestOnce = function () {
        var list = this.$$watchList;
        var dirty;
        for (var i = 0; i < list.length; i++) {
            var watch = list[i];
            console.log(watch);
            var newValue = watch.getNewValue(this.name);
            var oldValue = watch.last;
            if (newValue !== oldValue) {
                watch.listener(newValue, oldValue); // listener方法可能会修改页面的值，要dirty = true;重新执行一边
                // 因为listenter操作，已经检查过的数据可能变脏
                dirty = true;
            } else {
                dirty = false;
            }
            watch.last = newValue; // 更新老值
        }
        return dirty;
    };

    var $scope = new Scope();
    $scope.sum = 0;
    $scope.$watch('sum', function () {
        $scope.sum = scope.data * scope.faciend;
        return $scope[this.name];
    }, function (newValue, oldValue) {
        scope.sum = newValue;
        console.log('newValue:' + newValue + '--' + 'oldValue:' + oldValue);
    });

    // 绑定click事件，当点击时执行ng-click属性绑定的函数
    function bind() {
        var list = document.querySelectorAll('[ng-click]');
        for (var i = 0, l = list.length; i < l; i++) {
            // 绑定原生click事件
            list[i].onclick = (function (index) {
                return function () {
                    var func = this.getAttribute('ng-click');
                    scope[func](scope); // view->model
                    $scope.$digest();
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
            console.log('应用属性：' + bindData + '为：' + scope[bindData]);
            list[i].innerHTML = scope[bindData];
        }
    }

    bind();
    $scope.$digest();
    apply();
};