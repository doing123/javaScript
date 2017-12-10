/**
 * Diy a jQuery
 * @param  {[type]} global  客户端：window， node：global
 * @param  {[type]} factory 工厂函数生成jQuery实例对象
 * @return {[type]}         [description]
 */
(function(global, factory){
	return factory(global);
})(this, function(global){
	/**
	 * 无new创建
	 * @param  {[type]} arg 选择器
	 * @return {[type]}     [description]
	 */
	var jQuery = function(arg) {
		return new jQuery.fn.init(arg);
	};

	/**
	 * 原型对象
	 * @type {Function}
	 */
	jQuery.fn = jQuery.prototype = {
		init: function(arg) {
			var elem;
			if(arg){
				//查询获得类数组对象
				elem = document.querySelectorAll(arg);
				this[0] = elem;
				this.length = 1;
			}
			//链式调用
			return this;
		}
	};

	/**
	 * 定义jQuery对象和实例对象的extend方法
	 * @return {[type]} [description]
	 */
	jQuery.extend = jQuery.fn.extend = function() {
		var length = arguments.length;
		var target = arguments[0] || {};
		var i = 1;
		var name;

		//第一个参数转为引用类型的对象
		if(typeof target !== 'object' || typeof target !== 'function'){
			target = {};
		}

		//只有一个参数：扩展当前调用extend方法的对象本身(this)，
		//$.extend()扩展jQuery静态方法   $.fn.extend()
		if (i === length){
			target = this;
			i--;
		}

		//扩展任意对象  i>=1, length>=2
		for(; i < length; i++) {
			for(name in arguments[i]){
				target[name] = arguments[i][name];
			}
		}

		return target;
	};

	jQuery.fn.init.prototype = jQuery.fn;

	global.$ = global.jQuery = jQuery;
});

//测试
console.log($);
var obj = {name: 'doing123'};
var obj1 = {age: 12};
var obj2 = $.extend({}, obj1, obj);
console.log(obj2);

console.log($('#test'));