'use strict';

require('dotenv').config();

module.exports = function () {
    return {
        files: [
            'lib/**/*.js',
            'lib/**/*.json',
            '.env'
        ],

        tests: [
            'test/**/*.test.js'
        ],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest'
    };
};