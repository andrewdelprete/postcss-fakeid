var postcss = require('postcss');

module.exports = postcss.plugin('postcss-fakeid', function () {
    /**
     * Checks if the selector has an #id
     * @param  {Boolean}  selector
     * @return {Boolean}
     */
    function hasId(selector) {
        return /#\w+/gi.test(selector);
    }

    /**
     * Transform ID selectors to Attribute Selectors
     * @param  {String} selector
     * @return {String}
     */
    function transformIds(selector) {
        // Store an array of selectors
        var idArray = selector.match(/#\w+/gi);

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

    return function (root) {
        root.eachRule(function (rule) {
            if (!hasId(rule.selector)) return false;

            var newRule = postcss.rule({ selector: transformIds(rule.selector), nodes: rule.nodes });
            rule.replaceWith(newRule);
        });
    };
});
