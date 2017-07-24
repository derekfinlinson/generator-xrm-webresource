const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', { type: String, required: false });
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        },
        {
            type: 'input',
            name: 'solution',
            message: 'Your solution unique name'            
        },
        {
            type: 'list',
            name: 'package',
            message: 'Select package manager',
            default: 'npm',
            choices: [
                {
                    name: 'NPM',
                    value: 'npm'
                },
                {
                    name: 'Yarn',
                    value: 'yarn'
                }
            ]
        },
        {
            type: 'input',
            name: 'server',
            message: 'Your CRM URL'
        },
        {
            type: 'input',
            name: 'tenant',
            message: 'Your tenant'
        },
        {
            type: 'list',
            name: 'authType',
            message: 'Select authentication type',
            choices: [
                {
                    name: 'Username/Password',
                    value: 'user'
                },
                {
                    name: 'Client ID/Client Secret',
                    value: 'client'
                }
            ]
        },
        {
            type: 'input',
            name: 'username',
            message: 'Your username',
            when: (answers) => {
                return answers.authType === 'user'
            }
        },
        {
            type: 'password',
            name: 'password',
            message: 'Your Password',
            when: (answers) => {
                return answers.authType === 'user'
            }
        },
        {
            type: 'password',
            name: 'clientid',
            message: 'Your Client ID',
            when: (answers) => {
                return answers.authType === 'client'
            }
        },
        {
            type: 'password',
            name: 'clientsecret',
            message: 'Your Client Secret',
            when: (answers) => {
                return answers.authType === 'client'
            }
        }]).then(answers => {
            this.authType = answers.authType;
            this.appname = answers.name.replace(" ", "");
            this.server = answers.server;
            this.username = answers.username;
            this.password = answers.password;
            this.clientid = answers.clientid;
            this.clientsecret = answers.clientsecret;
            this.tenant = answers.tenant;
            this.solution = answers.solution;
            this.package = answers.package;
        });
    }

    writing() {
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { name: this.appname });
        this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
        this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));
        this.fs.copyTpl(this.templatePath('config.json'), this.destinationPath('config.json'));

        this.fs.copyTpl(this.templatePath('creds.json'), this.destinationPath('creds.json'), {
            solution: this.solution,
            server: this.server,
            tenant: this.tenant,
            clientid: this.clientid,
            clientsecret: this.clientsecret,
            username: this.username,
            password: this.password
        });
    }

    install() {
        switch (this.package) {
            case 'npm':
                this.npmInstall();
                break;
            case 'yarn':
                this.yarnInstall();
                break;
        }
    }
};

