var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('web resource project with user authentication', () => {
    var prompts = {
        prefix: 'Crm',
        name: 'web  resources ',
        solution: 'CRM Solution',
        server: 'https://org.crm.dynamics.com',
        username: 'user@org.onmicrosoft.com',
        password: 'SecretPassword',        
        authType: 'user',
        tenant: 'tenant.onmicrosoft.com'
    };

    beforeEach(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts(prompts);
    });

    test('generates project with webpack.config.js, tsconfig.json, package.json, config.json and creds.json', () => {
        var expected = [
            'package.json',
            'tsconfig.json',
            'webpack.config.js',
            'config.json',
            'creds.json'
        ];

        assert.file(expected);
    });

    test('package.json has web-resources name', () => {
        assert.fileContent('package.json', `"name": "${prompts.name.replace(" ", "")}"`);
    });
        
    test('creds.json has serer, username, password, tenant and solution', () => {
        var config = [
            `"server": "${prompts.server}"`,
            `"username": "${prompts.username}"`,
            `"password": "${prompts.password}"`,            
            `"solution": "${prompts.solution}"`,
            `"tenant": "${prompts.tenant}`
        ];

        for (let c of config) {
            assert.fileContent('creds.json', c);
        }
    });
});

describe('web resource project with client authentication', () => {
    var prompts = {
        prefix: 'Crm',
        name: 'web-resources',
        solution: 'crm',
        server: 'https://org.crm.dynamics.com',        
        clientid: 'randomid',
        clientsecret: 'clientSecret',
        authType: 'client'
    };

    beforeEach(() => {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts(prompts);
    });

    test('generates project with webpack.config.js, tsconfig.json, package.json, config.json and creds.json', () => {
        var expected = [
            'package.json',
            'tsconfig.json',
            'webpack.config.js',
            'config.json',
            'creds.json'
        ];

        assert.file(expected);
    });

    test('package.json has web-resources name', () => {
        assert.fileContent('package.json', `"name": "${prompts.name}"`);        
        
    });

    test('creds.json has server, clientId, clientSecret and solution', () => {
        var config = [
            `"server": "${prompts.server}"`,
            `"clientId": "${prompts.clientid}"`,
            `"clientSecret": "${prompts.clientsecret}"`,            
            `"solution": "${prompts.solution}"`
        ];

        for (let c of config) {
            assert.fileContent('creds.json', c);
        }
    });
});
