(function(global, factory){
	global.Vue = factory();
})(this, function(){
	// 默认配置
	var DEFAULT = {
		elem: 'body',
		data: {}
	};

	var Vue = function(options){
		this.extend(this, DEFAULT, options);
		this.observer();
	};

	Vue.prototype = {
		extend: function(){
			for(var i = 0; i < arguments.length; i++){
				for(var key in arguments[i]){
					this[key] = arguments[i][key];
				}
			}
		},
		observer: function(){
			var app = document.getElementById('app');
			// 只给input元素绑定事件
			var elems = app.querySelectorAll('input[v-model]');
			var _this = this;
			for(var i =0; i < elems.length; i++){
				elems[i].oninput = function(){
					// input事件触发值改变 -> defineProperty中的set方法
					_this.data[this.getAttribute('v-model')] = this.value;
				}
			}

			for(var key in this.data){
				var elems = app.querySelectorAll('[v-model='+ key +']');
				for(var i =0; i < elems.length; i++){
					elems[i].value = this.data[key];
					elems[i].innerText = this.data[key];
				}

				/**
				 * 留住 key
				 * @param  {[type]} key [description]
				 * @return {[type]}     [description]
				 */
				(function(key){
					Object.defineProperty(_this.data, key, {
						get: function(){
							return this.str;
							console.log(this.str);
						},
						set: function(val){
							var selector = '[v-model='+ key +']';
							var elems = app.querySelectorAll(selector);
							for(var i =0; i < elems.length; i++){
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