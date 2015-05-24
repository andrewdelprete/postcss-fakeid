var postcss = require('postcss');

module.exports = postcss.plugin('postcss-fakeid', function () {
    function transformIds(match) {
        // Store an array of selectors
        var idArray = match.match(/#\w+/gi);

        if (!idArray) {
            return false;
        }

        // Store an array of transformed selectors
        var idArrayTransformed = idArray
            .map(function(selector) {
                    return '[id="' + selector.slice(1, selector.length) + '"]';
                });

        // Replace selectors with transformed ones and return
        idArrayTransformed.forEach(function(selector, index) {
            var re = new RegExp(idArray[index]);
            match = match.replace(re, selector);
        });

        return match;
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
