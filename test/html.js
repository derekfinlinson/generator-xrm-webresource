var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('xrm-webresource:html', function () {
    beforeEach(function() {
        return helpers.run(path.join(__dirname, '../generators/html'))
            .withPrompts({prefix: 'Jt', filename: 'index'});
    });

    it('creates index.html file', function() {
        assert.file(['index.html']);
    });

    it('should add the file to gulp.js', function () {

    });
});
