const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('xrm-webresource:app', function () {
    before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({prefix: 'Jt', name: 'web-resources', solution: 'jt'});
    });

    it('generates a project with webpack.config.js, gulpfile.js, tsconfig.json and package.json', function () {
        const expected = [
            'package.json',
            'tsconfig.json',
            'webpack.config.js',
            'gulpfile.js',
            'config.js'
        ];

        assert.file(expected);

        assert.fileContent('package.json', '"name": "web-resources"');
        assert.fileContent('webpack.config.js', "library: 'Jt'");
    });
});
