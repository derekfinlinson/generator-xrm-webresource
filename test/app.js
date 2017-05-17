var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('xrm-webresource:app:user', function () {
    var prompts = {
        prefix: 'Jt',
        name: 'web-resources',
        solution: 'jt',
        server: 'https://org.crm.dynamics.com',
        username: 'user@org.onmicrosoft.com',
        password: 'SecretPassword',        
        authType: 'user'
    };

    before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts(prompts);
    });

    it('generates a project with webpack.config.js, gulpfile.js, tsconfig.json and package.json, config.json and creds.json', function () {
        var expected = [
            'package.json',
            'tsconfig.json',
            'webpack.config.js',
            'gulpfile.js',
            'config.json',
            'creds.json'
        ];

        assert.file(expected);

        assert.fileContent('package.json', `"name": "${prompts.name}"`);
        assert.fileContent('webpack.config.js', `library: '${prompts.prefix}'`);

        var config = [
            `"server": "${prompts.server}"`,
            `"username": "${prompts.username}"`,
            `"password": "${prompts.password}"`,            
            `"solution": "${prompts.solution}"`
        ];

        for (let c of config) {
            assert.fileContent('creds.json', c);
        }
        
    });
});

describe('xrm-webresource:app:client', function () {
    var prompts = {
        prefix: 'Jt',
        name: 'web-resources',
        solution: 'jt',
        server: 'https://org.crm.dynamics.com',        
        clientid: 'randomid',
        clientsecret: 'clientSecret',
        authType: 'client'
    };

    before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts(prompts);
    });

    it('generates a project with webpack.config.js, gulpfile.js, tsconfig.json and package.json, config.json and creds.json', function () {
        var expected = [
            'package.json',
            'tsconfig.json',
            'webpack.config.js',
            'gulpfile.js',
            'config.json',
            'creds.json'
        ];

        assert.file(expected);

        assert.fileContent('package.json', `"name": "${prompts.name}"`);
        assert.fileContent('webpack.config.js', `library: '${prompts.prefix}'`);

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
