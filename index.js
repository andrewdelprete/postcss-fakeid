var postcss = require('postcss');

module.exports = postcss.plugin('postcss-fakeid', function () {
    /**
     * Transform ID selectors to Attribute Selectors
     * @param  {String} selector
     * @return {String}
     */
    function transformIds(selector) {
        // Store an array of selectors
        var idArray = selector.match(/#\w+/gi);

        if (!idArray) {
            return false;
        }

        // Store an array of transformed selectors
        var idArrayTransformed = idArray
            .map(function(id) {
                    return '[id="' + id.slice(1, id.length) + '"]';
                });

        // Replace selectors with transformed ones and return
        idArrayTransformed.forEach(function(id, index) {
            var re = new RegExp(idArray[index]);
            selector = selector.replace(re, id);
        });

        return selector;
    }

    return function (css) {
        css.eachRule(function (rule) {
            var replaceSelectors = transformIds(rule.selector);

            if (replaceSelectors) {
                rule.replaceWith({ selector: replaceSelectors, nodes: rule.nodes });
            }
        });
    };
});
