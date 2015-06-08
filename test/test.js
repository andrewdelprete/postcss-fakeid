var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-fakeid', function () {

    it('handles converting #ids to attribute values', function (done) {
        test('#foo { font-size: 1rem; }', '[id="foo"] { font-size: 1rem\n}', {}, done);
    });

    it('handles converting multiple #ids to attribute values', function (done) {
        test('#foo #bar { font-size: 1rem; }', '[id="foo"] [id="bar"] { font-size: 1rem\n}', {}, done);
    });

    it('handles converting a mixture of selectors with #ids to attribute values', function (done) {
        test('#foo .bar { font-size: 1rem; }', '[id="foo"] .bar { font-size: 1rem\n}', {}, done);
    });

    it('handles converting an #id with a hyphen -', function (done) {
        test('#foo-id .bar { font-size: 1rem; }', '[id="foo-id"] .bar { font-size: 1rem\n}', {}, done);
    });

    it('handles converting an #ids when proceeded by other types of selectors like elements or classes', function (done) {
        test('.class { color: red }\n #foo { font-size: 1rem; }', '.class { color: red }\n [id="foo"] { font-size: 1rem }', {}, done);
    });
});
