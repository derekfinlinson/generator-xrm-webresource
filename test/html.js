var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('xrm-webresource:html', function () {
    beforeEach(function() {
        return helpers.run(path.join(__dirname, '../generators/html'))
            .inTmpDir(function (dir) {
                fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
            })
            .withPrompts({filename: 'index', uniqueName: "crm_index.html", displayName: "Index HTML"});
    });

    it('creates index.html file', function() {
        assert.file(['src/html/index.html']);
    });

    it('should add the file to config.json', function () {
        assert.fileContent('config.json', '"Path": "dist\\\\html\\\\index.html"');
        assert.fileContent('config.json', '"UniqueName": "crm_index.html"');
        assert.fileContent('config.json', '"DisplayName": "Index HTML"');
        assert.fileContent('config.json', '"Type": "HTML"');
    });
});
