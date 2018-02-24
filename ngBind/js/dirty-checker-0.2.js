// 脏检查的原理：model->view
window.onload = function () {
  /*function getNewValue(scope) {
      return scope[this.name];
  }*/

  function $scope() { // angular $scope
      this.$$watchList = [];
  }

  // 监听数值变化
  $scope.prototype.$watch = function (name, getNewValue, listener) {
      var watch = {
          name: name, // watch的对象
          getNewValue: getNewValue,
          listener: listener
      };

      this.$$watchList.push(watch);
  };

  $scope.prototype.$digest = function () {
      var list = this.$$watchList;
      var dirty = true;
      var checkTime = 0; // 检查的次数，TTL
      while(dirty){
          dirty = false;
          for(var i=0; i< list.length; i++){
              var watch = list[i];
              console.log(watch);
              var newValue = watch.getNewValue(this);
              var oldValue = watch.last;
              if(newValue !== oldValue){
                  watch.listener(newValue, oldValue); // listener方法可能会修改页面的值，要dirty = true;重新执行一边
                  watch.last = newValue; // 更新老值
                  dirty = true;
              }
              // list[i].listener();
          }
          checkTime++;
          if(checkTime > 10 && checkTime){
              throw new Error('脏检查执行次数过多。');
          }
      }
  };

  var scope = new $scope();
  scope.first = 0;
  scope.second = 0;
  scope.$watch('first', function () {
      return scope[this.name];
      // console.log('new value...');
  }, function (newValue, oldValue) {
      scope.second = 8;
      // scope.second++; // 此时脏检查，会导致死循环
      console.log('newValue:' + newValue + '--' + 'oldValue:' + oldValue);
  });

  scope.$watch('second', function () {
      return scope[this.name];
      // console.log('new value2...');
  }, function (newValue, oldValue) {
      // scope.first++;
      console.log('newValue:' + newValue + '--' + 'oldValue:' + oldValue);
  });

  // 手动执行调用
  scope.$digest();
};