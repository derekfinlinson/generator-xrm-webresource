const Generator = require('yeoman-generator');
const ast = require("ast-query");

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
        },
        {
            type: 'input',
            name: 'uniqueName',
            message: 'Script unique name (including prefix)'
        },
        {
            type: 'input',
            name: 'displayName',
            message: 'Script display name'
        }]).then(answers => {
            this.config.set("prefix", answers.prefix);            
            this.type = answers.type;
            this.filename = answers.filename;
            this.displayName = answers.displayName;
            this.uniqueName = answers.uniqueName;
        });
    }

    writing() {
        const prefix = this.config.get("prefix");
        
        if (this.type === 'form') {
            this.fs.copyTpl(this.templatePath('FormScript.ts'), this.destinationPath(`src/scripts/${this.filename}.ts`), { filename: this.filename });
        } else if (this.type === 'ribbon') {
            this.fs.copyTpl(this.templatePath('RibbonScript.ts'), this.destinationPath(`src/scripts/${this.filename}.ts`), { filename: this.filename });
        } else {
            this.fs.write(this.destinationPath(`src/scripts/${this.filename}.ts`), '');
        }
        
        if (this.fs.exists(this.destinationPath('config.json'))) {
            const config = this.fs.readJSON(this.destinationPath('config.json'));

            config.webResources.push(
                    {
                        Path: `dist\\js\\${prefix}.${this.filename}.js`,
                        UniqueName: this.uniqueName,
                        DisplayName: this.displayName,
                        Type: 'JavaScript'
                    }
            );

            config.entries[`${prefix}.${this.filename}`] = `./src/scripts/${this.filename}.ts`;

            this.fs.extendJSON(this.destinationPath('config.json'), config);
        } else {
            this.log("config.json file not found. Unable to add script to build tasks");
        }
    }
};