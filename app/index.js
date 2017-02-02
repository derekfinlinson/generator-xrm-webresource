const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', { type: String, required: false });
        this.templateData = {};
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
        }]).then(answers => {
            this.templateData.name = answers.name;
            this.templateData.prefix = answers.prefix;
        });
    }

    writing() {
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { name: this.options.appname });
        this.fs.copyTpl(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
        this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), { prefix: this.templateData.prefix });
        this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'));        
    }

    install() {
        this.npmInstall();
    }
};

