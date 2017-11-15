//封装成一个对象:兼容性事件处理程序
var eventUtil = {
	//添加句柄
	addHandler：function(element, type, handler){
		//DOM2级事件
		if (element.addEventListener) {
			//冒泡时出发
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent){
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	//删除句柄
	removeHandler：function(element, type, handler){
		//DOM2级事件
		if (element.removeEventListener) {
			//冒泡时出发
			element.removeEventListener(type, handler, false);
		} else if(element.attachEvent){
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	}
};