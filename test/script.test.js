var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('create form script', () => {
    beforeEach(() => {
        return helpers.run(path.join(__dirname, '../generators/script'))
            .inTmpDir((dir) => {
                fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
            })
            .withPrompts({
                prefix: 'Crm', filename: 'AccountForm', type: 'form', uniqueName: 'crm_AccountForm.js', displayName: "Account Form Script",
            });
    });

    test('create AccountForm.ts file with AccountForm class export', () => {
        assert.file(['src/scripts/AccountForm.ts']);
        assert.fileContent('src/scripts/AccountForm.ts', 'export class AccountForm');
    });

    test('add entries to config.js', () => {
        assert.fileContent('config.json', '"Crm.AccountForm": "./src/scripts/AccountForm.ts"');
        assert.fileContent('config.json', '"path": "./dist/js/Crm.AccountForm.js"');
        assert.fileContent('config.json', '"uniqueName": "crm_AccountForm.js"');
        assert.fileContent('config.json', '"displayName": "Account Form Script"');
        assert.fileContent('config.json', '"type": "JavaScript"');
    });
});

describe('create ribbon script', () => {
    beforeEach(() => {
        return helpers.run(path.join(__dirname, '../generators/script'))
            .inTmpDir((dir) => {
                fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
            })
            .withPrompts({
                prefix: 'Crm', filename: 'AccountRibbon', type: 'form', uniqueName: 'crm_AccountRibbon.js', displayName: "Account Ribbon Script",
            });
    });

    test('create AccountRibbon.ts file with AccountRibbon class export', () => {
        assert.file(['src/scripts/AccountRibbon.ts']);
        assert.fileContent('src/scripts/AccountRibbon.ts', 'export class AccountRibbon');
    });

    test('add entries to config.js', () => {
        assert.fileContent('config.json', '"Crm.AccountRibbon": "./src/scripts/AccountRibbon.ts"');
        assert.fileContent('config.json', '"path": "./dist/js/Crm.AccountRibbon.js"');
        assert.fileContent('config.json', '"uniqueName": "crm_AccountRibbon.js"');
        assert.fileContent('config.json', '"displayName": "Account Ribbon Script"');
        assert.fileContent('config.json', '"type": "JavaScript"');
    });
});

describe('create web resource script', () => {
    beforeEach(() => {
        return helpers.run(path.join(__dirname, '../generators/script'))
            .inTmpDir((dir) => {
                fs.copySync(path.join(__dirname, '../generators/app/templates'), dir);
            })
            .withPrompts({
                prefix: 'Crm', filename: 'Resource', type: 'form', uniqueName: 'crm_Resource.js', displayName: "Resource Script",
            });
    });

    test('create ResourceScript.ts', () => {
        assert.file(['src/scripts/Resource.ts']);
    });

    test('add entries to config.js', () => {
        assert.fileContent('config.json', '"Crm.Resource": "./src/scripts/Resource.ts"');    
        assert.fileContent('config.json', '"path": "./dist/js/Crm.Resource.js"');
        assert.fileContent('config.json', '"uniqueName": "crm_Resource.js"');
        assert.fileContent('config.json', '"displayName": "Resource Script"');
        assert.fileContent('config.json', '"type": "JavaScript"');
    });
});
