import xmlToJson from './parser/xml-json'

const request = require('request');

let informationBank; // hold initial parsed XML to JSON data

class BankInformationMain {

    constructor(bankInformationXML_URL) {
        BankInformationMain.getInformationXML(bankInformationXML_URL);
    }

    static getInformationXML(bankInformationXML_URL) {

        try {
            request(bankInformationXML_URL, function (error, response, body) {
                // Print the error if one occurred
                if (error) return console.log('error:', error);
                BankInformationMain.parseInfo(body);
            });
        } catch (e) {
            console.log(e);
        }
    }

    static parseInfo(xml) {
        const jsonData = xmlToJson(xml);
        const parsedJsonData = JSON.parse(jsonData);
        if (!parsedJsonData['BRANCHES']) return console.log('error: XML parsing mismatch');
        informationBank = Object.freeze(parsedJsonData['BRANCHES']['BRANCH']);
        console.log('parsed XML : OK && items parsed: ', parsedJsonData['BRANCHES']['BRANCH'].length);
    }

    static byBankNumber() {
    }

    static byBranchNumber() {
    }

    getInformationBank() {
        return informationBank;
    }
}

export default BankInformationMain;
