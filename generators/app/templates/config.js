var webResources = [];
var entries = {};

module.exports = {
    upload: {
        Server: process.env.crmServer,
        User: process.env.crmUser,
        Password: process.env.crmPassword,
        WebResources: webResources
    },
    entry: entries
}