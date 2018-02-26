(function (root, factory) {
    root.$ = factory();
})(this, function () {
    var QJS = {
        memorize: function (func, hasher) {
            function memory(name) {
                var cache = memory.cache;

                var key = '' + (hasher ? hasher.apply(this, arguments) : name);

                if (!cache[key]) {
                    cache[key] = func.apply(this, arguments);
                }
                return cache[key];
            }

            memory.cache = {};
            return memory;
        }
    };

    return QJS;
});