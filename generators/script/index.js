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
            name: 'namespace',
            message: 'Your script namespace',
            default: this.config.get("namespace")
        },
        {
            type: 'input',
            name: 'filename',
            message: 'Script name'
        },
        {
            type: 'input',
            name: 'uniqueName',
            message: 'Script unique name (including solution prefix)'
        },
        {
            type: 'input',
            name: 'displayName',
            message: 'Script display name'
        }]).then(answers => {
            this.config.set("namespace", answers.namespace);            
            this.type = answers.type;
            this.filename = answers.filename;
            this.displayName = answers.displayName;
            this.uniqueName = answers.uniqueName;
        });
    }

    writing() {
        const namespace = this.config.get("namespace");
        
        // Write script file
        if (this.type === 'form') {
            this.fs.copyTpl(this.templatePath('FormScript.ts'), this.destinationPath(`src/scripts/${this.filename}.ts`), { namespace: namespace, filename: this.filename, variable: this.filename.toLowerCase() });
        } else if (this.type === 'ribbon') {
            this.fs.copyTpl(this.templatePath('RibbonScript.ts'), this.destinationPath(`src/scripts/${this.filename}.ts`), { namespace: namespace, filename: this.filename, variable: this.filename.toLowerCase() });
        } else {
            this.fs.write(this.destinationPath(`src/scripts/${this.filename}.ts`), '');
        }

        // Write script test file
        this.fs.write(this.destinationPath(`test/scripts/${this.filename}.test.js`), '');
        
        // Update config.json
        if (this.fs.exists(this.destinationPath('config.json'))) {
            const config = this.fs.readJSON(this.destinationPath('config.json'));

            config.webResources.push(
                {
                    path: `./dist/js/${namespace}.${this.filename}.js`,
                    uniqueName: this.uniqueName,
                    displayName: this.displayName,
                    type: 'JavaScript'
                }
            );

            config.entries[`${namespace}.${this.filename}`] = `./src/scripts/${this.filename}.ts`;

            this.fs.extendJSON(this.destinationPath('config.json'), config);
        } else {
            this.log("config.json file not found. Unable to add script to build tasks");
        }
    }
};