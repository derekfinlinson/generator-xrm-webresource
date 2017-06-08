var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('xrm-webresource:script:form', function () {
    before(function() {
        return helpers.run(path.join(__dirname, '../generators/script'))
            .inTmpDir(function (dir) {
                fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
            })
            .withPrompts({
                prefix: 'Crm', filename: 'AccountForm', type: 'form', uniqueName: 'crm_AccountForm.js', displayName: "Account Form Script",
            });
    });

    it('creates AccountForm.ts file with AccountForm class export', function() {
        assert.file(['src/scripts/AccountForm.ts']);
        assert.fileContent('src/scripts/AccountForm.ts', 'export class AccountForm');
    });

    it('should add entries to config.js', function () {
        assert.fileContent('config.json', '"Crm.AccountForm": "./src/scripts/AccountForm.ts"');
        assert.fileContent('config.json', '"path": "./dist/js/Crm.AccountForm.js"');
        assert.fileContent('config.json', '"uniqueName": "crm_AccountForm.js"');
        assert.fileContent('config.json', '"displayName": "Account Form Script"');
        assert.fileContent('config.json', '"type": "JavaScript"');
    });
});

describe('xrm-webresource:script:ribbon', function () {
    before(function() {
        return helpers.run(path.join(__dirname, '../generators/script'))
            .inTmpDir(function (dir) {
                fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
            })
            .withPrompts({
                prefix: 'Crm', filename: 'AccountRibbon', type: 'form', uniqueName: 'crm_AccountRibbon.js', displayName: "Account Ribbon Script",
            });
    });

    it('creates AccountRibbon.ts file with AccountRibbon class export', function() {
        assert.file(['src/scripts/AccountRibbon.ts']);
        assert.fileContent('src/scripts/AccountRibbon.ts', 'export class AccountRibbon');
    });

    it('should add entries to config.js', function () {
        assert.fileContent('config.json', '"Crm.AccountRibbon": "./src/scripts/AccountRibbon.ts"');
        assert.fileContent('config.json', '"path": "./dist/js/Crm.AccountRibbon.js"');
        assert.fileContent('config.json', '"uniqueName": "crm_AccountRibbon.js"');
        assert.fileContent('config.json', '"displayName": "Account Ribbon Script"');
        assert.fileContent('config.json', '"type": "JavaScript"');
    });
});

describe('xrm-webresource:script:resource', function () {
    before(function() {
        return helpers.run(path.join(__dirname, '../generators/script'))
            .inTmpDir(function (dir) {
                fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
            })
            .withPrompts({
                prefix: 'Crm', filename: 'Resource', type: 'form', uniqueName: 'crm_Resource.js', displayName: "Resource Script",
            });
    });

    it('creates ResourceScript.ts', function() {
        assert.file(['src/scripts/Resource.ts']);
    });

    it('should add entries to config.js', function () {
        assert.fileContent('config.json', '"Crm.Resource": "./src/scripts/Resource.ts"');    
        assert.fileContent('config.json', '"path": "./dist/js/Crm.Resource.js"');
        assert.fileContent('config.json', '"uniqueName": "crm_Resource.js"');
        assert.fileContent('config.json', '"displayName": "Resource Script"');
        assert.fileContent('config.json', '"type": "JavaScript"');
    });
});
