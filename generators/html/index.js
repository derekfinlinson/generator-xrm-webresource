const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting() {
        return this.prompt([
        {
            type: 'input',
            name: 'prefix',
            message: 'Your library prefix',
            default: this.config.get("prefix")
        },
        {
            type: 'input',
            name: 'filename',
            message: 'HTML filename'
        }]).then(answers => {
            this.config.set("prefix", answers.prefix);
            this.filename = answers.filename;
        });
    }

    writing() {
        var prefix = this.config.get("prefix");
        this.fs.copy(this.templatePath('index.html'), this.destinationPath(this.filename + '.html'));
    }
};