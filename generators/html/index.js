const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting() {
        return this.prompt([
        {
            type: 'input',
            name: 'filename',
            message: 'HTML filename'
        },
        {
            type: 'input',
            name: 'uniqueName',
            message: 'HTML page unique name (including prefix)'           
        },
        {
            type: 'input',
            name: 'displayName',
            message: 'HTML page display name'
        }]).then(answers => {            
            this.filename = answers.filename;
            this.displayName = answers.displayName;
            this.uniqueName = answers.uniqueName;
        });
    }

    writing() {
        this.fs.copy(this.templatePath('index.html'), this.destinationPath(`src/html/${this.filename}.html`));

        if (this.fs.exists(this.destinationPath('config.json'))) {
            const config = this.fs.readJSON(this.destinationPath('config.json'));

            config.webResources.push(
                    {
                        path: `./dist/html/${this.filename}.html`,
                        uniqueName: this.uniqueName,
                        displayName: this.displayName,
                        type: 'HTML'
                    }
            );

            this.fs.extendJSON(this.destinationPath('config.json'), config);
        } else {
            this.log("config.json file not found. Unable to add script to build tasks");
        }
    }
};