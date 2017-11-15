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
	},

	//获得事件对象
	getEvent: function(event) {
		return event || window.event;
	},

	//获得事件类型
	getType: function(event)｛
		return event.type;
	},

	//获得事件对象元素
	getElement: function(event) {
		return event.target || event.srcElement;
	},

	//阻止事件默认行为
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			//IE:returnValue=false阻止事件的默认行为
			event.returnValue = false;
		}
	}，

	//阻止事件冒泡
	stopPropagation: function(event) {
		if(event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};