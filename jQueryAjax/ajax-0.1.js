(function (global, factory) {
    global.$ = factory();
})(this, function () {
    var jQuery = function () {
        return new jQuery.fn.init();
    };

    jQuery.fn = jQuery.prototype = {
        init: function () {

        },
        ajax: function () {

        },
        css: function () {

        }
    };
    jQuery.extend = jQuery.fn.extend = function () {
        var len = arguments.length;
        var target = arguments[0] || {}; // 第一个参数保证是{}
        var i = 1;
        var key;
        if (typeof target !== 'object' || typeof target !== 'function') {
            target = {};
        }
        if (i === len) {
            target = this;
            i--
        }
        for (; i < len; i++) {
            for (key in arguments[i]) {
                target[key] = arguments[i][key];
            }
        }
        return target;
    };

    // Ajax函数
    jQuery.extend({
        ajax: function (options) {
            function empty() {

            }
            function obj2Url(obj) {
                if(obj && obj instanceof Object){
                    var arr = [];
                    for(var i in obj){
                        if(obj.hasOwnProperty(i)){
                            if(typeof obj[i] === 'function'){
                                obj[i] = obj[i]();
                            }
                            if(obj[i] === null){
                                obj[i] = '';
                            }
                            arr.push(escape(i) + '=' + escape(obj[i]));
                        }
                    }
                    return arr.join('&').replace(/%20/g, '+');
                } else {
                    return obj;
                }
            }
            var config = {
                url: '',
                sync: true,
                method: 'GET',
                data: null,
                username: null,
                password: null,
                dataType: null,
                success: empty,
                error: empty,
                timeout: 0
            };
            var opt = jQuery.extend({}, config, options);
            var accepts = {
                script: 'text/javascript, application/javascript, application/x-javascript',
                json: 'application/json',
                xml: 'application/xml, text/xml',
                html: 'text/html',
                text: 'text/plain'
            };
            var abortTimeout = null;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4){
                    xhr.onreadystatechange = empty;
                    clearTimeout(abortTimeout);
                    var result, dataType, error = false;
                    if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || (xhr.status ===0)){
                        if(xhr.responseType === 'arraybuffer' || xhr.responseType === 'blob'){
                            result = xhr.response;
                        } else {
                            result = xhr.responseText;
                            dataType = opt.dataType ? opt.dataType : xhr.getResponseHeader('content-type');
                            for(var i in accepts){
                                if(accepts.hasOwnProperty(i) && accepts[i].indexOf(dataType) > -1){
                                    dataType = i;
                                }
                            }
                            try{
                                if(dataType === 'script'){
                                    eval(result);
                                } else if(dataType === 'xml'){
                                    result = xhr.responseXML;
                                } else if(dataType === 'json'){
                                    result = result.trim() === '' ? null : JSON.parse(result);
                                }
                            } catch (e){
                                opt.error(e);
                                xhr.abort();
                            }
                        }
                        opt.success(result, xhr);
                    } else {
                        opt.error(xhr.statusText, xhr);
                    }
                }
            };

            if(opt.method === 'GET'){
                var parse = opt.url;
                opt.data = jQuery.extend({}, opt.data);
                opt.url = parse + '?' + obj2Url(opt.data);
                opt.data = null;
            }
            xhr.open(opt.method, opt.url, opt.sync, opt.username, opt.password);
            if(opt.method === 'POST'){
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            }
            if(opt.timeout > 0){
                abortTimeout = setTimeout(function () {
                    xhr.onreadystatechange = empty;
                    xhr.abort();
                    opt.error('timeout', xhr);
                }, opt.timeout);
            }
            xhr.send(opt.data ? obj2Url(opt.data) : null);
        }
    });

    jQuery.fn.init.prototype = jQuery.fn;
    return jQuery;
});