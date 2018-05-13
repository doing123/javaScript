/**
 * 只考虑基本情况：子节点是 元素
 * @param vnode
 * @returns {*}
 */
function createElement(vnode) {
    var tag = vnode.tag;
    var attrs = vnode.attrs || {};
    var children = vnode.children || [];
    if(!tag){
        return null;
    }

    // 创建真实的 dom 元素
    var elem = document.getElementById(tag);

    // 属性
    var attrName;
    for(attrName in attrs){
        if(attrs.hasOwnProperty(attrName)){
            // 给 elem 添加属性
            elem.setAttribute(attrName, attrs[attrName]);
        }
    }
    // 子元素
    children.forEach(function (childNode) {
        // 给 elem 添加子元素
        elem.appendChild(createElement(childNode));
    });

    // 返回真实的 dom 元素
    return elem;
}