(function (global, factory) {
    global.$ = factory();
})(this, function () {
    var jQuery = function () {
        return new jQuery.fn.init();
    };

    jQuery.prototype = {
        init: function () {

        },
        ajax: function () {

        }
    };
    jquery.extend = jQuery.prototype.extend = function () {

    };

    jQuery.fn = jQuery.prototype;
    return jquery;
});