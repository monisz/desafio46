const minimist = require('minimist');

const args = process.argv.slice(2);
const argsparse = minimist(args, {
    default: {
        port: 8080,
        persistenceType : 'mongoDb'
    },
    alias: {
        p: 'port',
        t: 'persistenceType'
    }
});

module.exports = argsparse;