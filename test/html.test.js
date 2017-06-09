var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/html'))
        .inTmpDir((dir) => {
            fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
        })
        .withPrompts({filename: 'index', uniqueName: "crm_index.html", displayName: "Index HTML"});
});

test('creates index.html file', () => {
    assert.file(['src/html/index.html']);
});

test('should add the file to config.json', () => {
    assert.fileContent('config.json', '"path": "./dist/html/index.html"');
    assert.fileContent('config.json', '"uniqueName": "crm_index.html"');
    assert.fileContent('config.json', '"displayName": "Index HTML"');
    assert.fileContent('config.json', '"type": "HTML"');
});
