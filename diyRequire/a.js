/**
 * 实现define加载依赖的情况
 */
define('a', ['c'], function (c) {
    console.log('a模块加载了。。。');
    c.increase();
    return {
        decrease: function () {
            console.log('a.decrease调用了。。。');
        }
    }
});