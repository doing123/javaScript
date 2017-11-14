function myReady(fn){
	//对于现代的浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", fn, false);
	} else {
		IEContentLoaded(fn);
	}
	
	//IE模拟DOMContenLoaded
	function IEContentLoaded(fn){
		var done = false;
		var d = window.document;

		//只执行一次用户的回调函数init()
		var init = function () {
			if(!done) {
				done = true;
				fn();
			}
		};

		(function () {
			try {
				//DOM树未创建完之前调用doScroll会报错
				d.documentElement.doScroll('left');
			} catch (e) {
				//延迟再试一次
				setTimeout(arguments.callee, 50);
				return;
			}
			//没有错误就表示DOM树创建完成，然后立马执行用户的回调
			init();
		})();

		//监听document的加载状态
		d.onreadystatechange = function() {
			//如果用户是在domReady之后绑定的函数 就立即执行
			if (d.readyState === 'complete') {
				d.onreadystatechange = null;
				init();
			}
		}
	}
}