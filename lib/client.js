'use strict';

const request = require('request-promise-native');

class YieldloveClient {
    constructor(options) {
        if (options.key === undefined) throw new Error("You have to provide api key.");
        this.key = options.key;
    }
}

YieldloveClient.prototype.dispatch = function (baseURL) {
    return request.get(baseURL)
};

YieldloveClient.prototype.getData = require("./getData");

module.exports = YieldloveClient;