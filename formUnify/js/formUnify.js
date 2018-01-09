
(function(window, factory, plugin){
	factory(jQuery, plugin);
})(this, function(jQuery, plugin){
	var DEFAULT = {
		defualtEvent: 'input',
		plugin: 'qq'
	};

	var RULES = {
		regexp: function(data){
			return new RegExp(data).test(this.val());
		},
		required: function(data){
			return this.val();
		},
		'min-length': function(data){
			return this.val().length >= data;
		},
		'confirm': function(data){
			var pwdElement = $('[type=password]')[0];
			if(pwdElement.value === '' || this.val() !== pwdElement.value){
				return false;
			} else {
				return true;
			}
		}
	}
	// jquery扩展插件
	$.fn[plugin] = function(options){
		if(!this.is('form')){
			return;
		}

		this.$elem = this.find('input');
		$.extend(this, DEFAULT, options);

		this.$elem.on(this.defualtEvent, function(){
			var _this = $(this);
			_this.siblings('p').remove();

			$.each(RULES, function(key, fn){
				var $filename = _this.data(DEFAULT.plugin + '-' + key);
				var $tipmessage = _this.data(DEFAULT.plugin + '-' + key + '-message');

				if($filename){
					var result = fn.call(_this, $filename);
					if(!result){
						_this.after('<p style="color:red;padding: 3px 0;">' + $tipmessage + '</p>')
					}
				}
			});
		});

		// 提交表单
		var _this = this;
		this.on('submit', function(){
			_this.$elem.trigger(_this.defualtEvent);
			return false;
		});
	};

	// 扩展方法
	$.fn[plugin].extendFn = function(options){
		$.extend(RULES, options);
	}
}, 'validate');