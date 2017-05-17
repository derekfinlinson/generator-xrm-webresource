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
            name: 'prefix',
            message: 'Your library prefix'
        },
        {
            type: 'input',
            name: 'solution',
            message: 'Your solution prefix',
            default: 'new'
        },
        {
            type: 'input',
            name: 'server',
            message: 'Your CRM URL'
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
            this.config.set('prefix', answers.prefix);
            this.config.set('solution', answers.solution);
            this.appname = answers.name;
            this.server = answers.server;
            this.username = answers.username;
            this.password = answers.password;
            this.clientid = answers.clientid;
            this.clientsecret = answers.clientsecret;
        });
    }

    writing() {
        var prefix = this.config.get('prefix');
        var solution = this.config.get('solution');

        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { name: this.appname });
        this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
        this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), { prefix: prefix });        
        this.fs.copyTpl(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
        this.fs.copyTpl(this.templatePath('config.json'), this.destinationPath('config.json'));
        this.fs.copyTpl(this.templatePath('creds.json'), this.destinationPath('creds.json'), {
            solution: solution,
            server: this.server,
            username: this.username,
            password: this.password,
            clientid: this.clientid,
            clientsecret: this.clientsecret
        });
    }

    install() {
        this.yarnInstall();
    }
};

