* angularJs
    
    模板功能强大，双向数据绑定。脏检查机制。
    用户有操作：Ajax/event/setTimeout
    DOM绑定数量极限值：3000
* vue

    双向数据绑定：
    
        `Object.defineProperty('obj', 'name', {
            `get: function(){},
            `set: function(value){}
        `});
    
    只关注WEB端。没有原生的‘服务端渲染’。
    
    服务端渲染：首屏快速加载、SEO
* Angular4

    双向数据绑定：[(ngModel)] ngZone
    移动端：Ionic
* ReactNative 

    虚拟DOM，速度快，DOM快照对比
    没有完整的框架