function $(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
}

//延迟切换
/*window.onload = function() {
	//添加标签索引
	var index = 0,
		timer = null,
		lis = $('notice-title').getElementsByTagName('li'),
		divs = $('notice-content').getElementsByTagName('div');

	if (lis.length !== divs.length) {
		return;
	}

	//遍历所有标签
	for(var i = 0; i < lis.length; i++){
		lis[i].id = i;
		lis[i].onmouseover = function() {
			//留住this
			var that = this;
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(function(){
				for(var j = 0; j < lis.length; j++) {
					lis[j].className = '';
					divs[j].style.display = 'none';
				}
				lis[that.id].className = 'select';
				divs[that.id].style.display = 'block';
			}, 500);
		}
	}
}*/

//自动切换
window.onload = function() {
	var index,
		timer = null,
		lis = $('notice-title').getElementsByTagName('li'),
		divs = $('notice-content').getElementsByTagName('div');

	for(var i = 0; i < lis.length; i++) {
		lis[i].id = i;
		/**
		 * 鼠标进入，暂停自动切换，进入选中内容
		 * @return {[type]} [description]
		 */
		lis[i].onmouseover = function(){
			clearTimeout(timer);
			changeOption(this.id);
		}

		/**
		 * 鼠标离开2秒后自动切换
		 * @return {[type]} [description]
		 */
		lis[i].onmouseout = function(){
			timer = setInterval(autoPlay, 2000);
		}
	}

	if(timer){
		clearTimeout(timer);
		timer = null;
	}

	timer = setInterval(autoPlay, 2000);

	function autoPlay(){
		index++;
		if(index >= lis.length){
			index = 0; //循环一圈index重置为0
		}
		changeOption(index);
	}

	function changeOption(curIndex) {
		for(var j = 0; j < lis.length; j++) {
			lis[j].className = '';
			divs[j].style.display = 'none';
		}

		lis[curIndex].className = 'select';
		divs[curIndex].style.display = 'block';
		index = curIndex; //重置index的值为当前选中索引
	}
}