/**
 * 实现一个模块加载器：
 * 暴露出两个方法：
 * 1.use方法启动主模块
 * 2.define方法
 * 
 * 进一步完善：
 * 多模块依赖处理
 * 路径解析问题
 * config配置
 * define 允许匿名模块且有依赖
 */

(function (root) {
    var QMD = {
        define: define,
        use: use
    };

    root.define = define;
    root.QMD = QMD;

    /**
     * 启动主模块：先加载依赖，再执行模块回调函数
     * @param deps 依赖 ['a','b']
     * @param callback 回调
     */
    function use(deps, callback) {
        if(deps.length === 0){
            callback();
        }

        var depsLength = deps.length; // 依赖数组的长度
        var params = []; // 按顺序保存依赖返回对象
        for(var i = 0; i < depsLength; i++){
            (function (index) {
                /**
                 * 1.依赖是否加载
                 * 2.先加载依赖再执行回调
                 * 3.将依赖的对象传递给主模块回调函数参数
                 */
                loadModule(deps[index], function(param){
                    depsLength--;
                    // params[index] = deps[index];
                    params[index] = param;
                    if(depsLength === 0){ // 依赖全部加载后执行回调
                        callback.apply(null, params);
                    }
                });
            })(i);
        }
    }

    /**
     * 路径解析
     * @param name
     * @param callback
     */
    function loadScript(name, callback) {
        var d = document;
        var node = d.createElement('script');
        node.src = name + '.js';
        d.body.appendChild(node);

        node.onload = function () {
            if(moduleMap[name].deps.length > 0){
                use(moduleMap[name].deps, function (params) {
                    // 依赖c加载完成后，以c返回的对象作参数，执行a的回调函数
                    var param = moduleMap[name].callback(params);
                    callback(param);
                });
            } else {
                var param = moduleMap[name].callback();
                callback(param);
            }
        }

        /*if('onload' in node){
            node.onload = callback;
        } else {
            node.onreadystatechange = function () {
                if(node.readyState === 'complete'){
                    callback();
                }
            }
        }*/
    }

    /**
     * 加载模块的方法
     * 同样是：先加载依赖，再执行模块回调函数，使用use方法
     */
    function loadModule(name, callback) {
        use([], function () {
            loadScript(name, callback);
        });
    }

    /**
     * define 定义模块
     */
    var moduleMap = [];
    function define(name, deps, callback) {
        moduleMap[name] = {};
        moduleMap[name].callback = callback;
        moduleMap[name].deps = deps;
    }
})(this);