// 提取dom元素
function $(selector) {
    return document.querySelector(selector);
}
// 提取dom元素
function $$(selector) {
    return document.querySelectorAll(selector);
}

//创建dom对象
function $$$(tagName) {
    return document.createElement(tagName);
}