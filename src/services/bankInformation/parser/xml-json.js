const parser = require('xml2json');

function xmlToJson(xml) {

    return parser.toJson(xml);
}

export default xmlToJson;
