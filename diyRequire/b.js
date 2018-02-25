
define('b',[], function () {
    console.log('b模块加载了。。。');
    return {
        add: function () {
            console.log('b.add调用了。。。');
        }
    }
});