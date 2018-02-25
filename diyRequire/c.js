/**
 * 实现define加载依赖的情况
 */
define('c', [], function () {
    console.log('c模块加载了。。。');
    return {
        increase: function () {
            console.log('c.increase调用了。。。');
        }
    }
});