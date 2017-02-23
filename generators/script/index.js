const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting() {
        return this.prompt([{
            type: 'list',
            name: 'type',
            message: 'Select script type',
            choices: [
                {
                    name: 'Form Script',
                    value: 'form'
                },
                {
                    name: 'Ribbon Script',
                    value: 'ribbon'
                },
                {
                    name: 'Web Resource',
                    value: 'resource'
                }
            ]
        },
        {
            type: 'input',
            name: 'prefix',
            message: 'Your library prefix',
            default: this.config.get("prefix")
        },
        {
            type: 'input',
            name: 'filename',
            message: 'Script name'
        }]).then(answers => {
            this.config.set("prefix", answers.prefix);
            this.type = answers.type;
            this.filename = answers.filename;            
        });
    }

    writing() {
        var prefix = this.config.get("prefix");

        if (this.type === 'form') {
            this.fs.copyTpl(this.templatePath('FormScript.ts'), this.destinationPath('src/scripts/' + this.filename + '.ts'), { filename: this.filename });
        } else if (this.type === 'ribbon') {
            this.fs.copyTpl(this.templatePath('RibbonScript.ts'), this.destinationPath('src/scripts/' + this.filename + '.ts'), { filename: this.filename });
        } else {
            this.fs.write(this.destinationPath('src/scripts/' + this.filename + '.ts'), '');
        }

        var gulp = this.fs.read(this.destinationPath('gulpfile.js'));
        var webpack = this.fs.read(this.destinationPath('webpack.config.js'));
        
        console.log(gulp);
        console.log(webpack);
    }
};