
window.onload = function () {
    'use strict';
    var scope = {
        increaseSprite: function () {
            this.sprite++;
        },
        decreaseSprite: function () {
            this.sprite--;
        },
        increaseCola: function () {
            this.cola++;
        },
        decreaseCola: function () {
            this.cola--;
        },
        cola: 0,
        sprite: 0,
        price: 3
    };

    // angular中的$scope作用域
    function Scope() {
        this.$$watchList = [];
    }

    Scope.prototype.$watch = function (name, getNewValue, listener) {
        var watch = {
            name: name,
            getNewValue: getNewValue,
            listener: listener
        };

        this.$$watchList.push(watch);
    };

    // 脏检测
    Scope.prototype.$digest = function () {
        var dirty = true;
        var checkTime = 0;
        while(dirty){
            dirty = false;
            var list = this.$$watchList;
            for(var i = 0; i < list.length; i++){
                var watch = list[i];
                console.log(watch);
                var newValue = watch.getNewValue(watch.name);
                var oldValue = watch.last;
                if(newValue !== oldValue){
                    watch.listener(newValue, oldValue);
                    dirty = true;
                } else {
                    scope[watch.name] = newValue; // 赋值给变量
                }

                watch.last = newValue;
            }
            checkTime++;
            if(dirty && checkTime > 10){
                throw new Error('脏检查执行次数过多。');
            }
        }
    };

    var $scope = new Scope();
    $scope.$watch('sprite', function(){
        $scope.sprite = scope.sprite;
        return $scope[this.name];
    }, function (newValue, oldValue) {
        console.log('sprite: newValue ' + newValue + '--' + 'oldValue ' + oldValue);
    });

    $scope.$watch('cola', function(){
        $scope.cola = scope.cola;
        return $scope[this.name];
    }, function (newValue, oldValue) {
        console.log('cola: newValue ' + newValue + '--' + 'oldValue ' + oldValue);
    });

    $scope.$watch('sum', function(){
        $scope.sum = scope.sprite * scope.price + scope.cola * scope.price;
        return $scope[this.name];
    }, function (newValue, oldValue) {
        console.log('sum: newValue ' + newValue + '--' + 'oldValue ' + oldValue);
    });

    function bind() {
        var list = document.querySelectorAll('[ng-click]');
        for(var i = 0, l = list.length; i < l; i++){
            list[i].onclick = (function (index) {
                return function () {
                    var func = this.getAttribute('ng-click');
                    scope[func]();
                    apply();
                }
            })(i);
        }
    }

    function apply() {
        $scope.$digest();
        var list = document.querySelectorAll('[ng-bind]');
        for (var i = 0, l = list.length; i < l; i++) {
            var bindData = list[i].getAttribute('ng-bind');
            console.log('应用属性：' + bindData + '为：' + scope[bindData]);
            list[i].innerHTML = scope[bindData];
        }
    }

    bind();
    apply();
};