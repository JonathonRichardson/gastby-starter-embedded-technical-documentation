const { useGatsbyConfig } = require('gatsby-plugin-ts-config');

module.exports = useGatsbyConfig(() => {
    const package = require('./gatsby-config.ts');

    return package.Configuration;
}, {});
