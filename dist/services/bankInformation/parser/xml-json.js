'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var parser = require('xml2json');

function xmlToJson(xml) {

    return parser.toJson(xml);
}

exports.default = xmlToJson;
//# sourceMappingURL=xml-json.js.map