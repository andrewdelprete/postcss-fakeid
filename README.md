# PostCSS FakeId [![Build Status][ci-img]][ci]

[PostCSS] PostCSS plugin to transform #id's to attribute selectors.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/Pathsofdesign/postcss-fakeid.svg
[ci]: https://travis-ci.org/pathsofdesign/postcss-fakeid
[specificity]: http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity

## Why ?
Many respectable devs within the web community frown upon the use of #ids in CSS due to their high specificity. This plugin stems from the need to help normalize selector priorities in scenerios where you can't control the CSS you're working with (3rd party libraries, legacy CSS, etc...). Because an Attribute Selector `[id="foo"]` is the same specificity as using a Class Selector, it makes it easier to overwrite styles without having to be more specific (ie: !important, html #foo, etc...).
 
> Specificity throws a real curve-ball at a language which is entirely dependent upon source order. To make things worse, you can’t opt out of it, and the only way to deal with it is by getting more and more specific. 
[http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity][specificity]



## Examples

```css
#foo .bar {
    font-size: 1rem;
}
```

```css
[id="foo"] .bar {
    font-size: 1rem;
}
```

## Usage

```js
postcss([ require('postcss-fakeid') ])
```

See [PostCSS] docs for examples for your environment.