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
            typoe: 'input',
            name: 'solution',
            message: 'Your solution prefix',
            default: 'new'
        }]).then(answers => {
            this.config.set('prefix', answers.prefix);
            this.config.set('solution', answers.solution);
            this.appname = answers.name;
        });
    }

    writing() {
        var prefix = this.config.get('prefix');
        var solution = this.config.get('solution');

        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { name: this.appname });
        this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
        this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), { prefix: prefix });
        this.fs.copyTpl(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'), { prefix: prefix, solution: solution });
    }

    install() {
        this.npmInstall();
    }
};

