<!-- # PostCSS FakeId [![Build Status][ci-img]][ci] -->

[PostCSS] PostCSS plugin to transform #id's to attribute selectors.

[PostCSS]: https://github.com/postcss/postcss
<!-- [ci-img]: https://travis-ci.org/pathsofdesign/postcss-fakdeid.svg
[ci]: https://travis-ci.org/pathsofdesign/postcss-fakeid -->

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