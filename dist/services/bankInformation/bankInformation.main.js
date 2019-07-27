'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xmlJson = require('./parser/xml-json');

var _xmlJson2 = _interopRequireDefault(_xmlJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

var informationBank = void 0; // hold initial parsed XML to JSON data

var BankInformationMain = function () {
    function BankInformationMain(bankInformationXML_URL) {
        _classCallCheck(this, BankInformationMain);

        BankInformationMain.getInformationXML(bankInformationXML_URL);
    }

    _createClass(BankInformationMain, [{
        key: 'getInformationBank',
        value: function getInformationBank() {
            return informationBank;
        }
    }], [{
        key: 'getInformationXML',
        value: function getInformationXML(bankInformationXML_URL) {

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
    }, {
        key: 'parseInfo',
        value: function parseInfo(xml) {
            var jsonData = (0, _xmlJson2.default)(xml);
            var parsedJsonData = JSON.parse(jsonData);
            if (!parsedJsonData['BRANCHES']) return console.log('error: XML parsing mismatch');
            informationBank = Object.freeze(parsedJsonData['BRANCHES']['BRANCH']);
            console.log('parsed XML : OK && items parsed: ', parsedJsonData['BRANCHES']['BRANCH'].length);
        }
    }, {
        key: 'byBankNumber',
        value: function byBankNumber() {}
    }, {
        key: 'byBranchNumber',
        value: function byBranchNumber() {}
    }]);

    return BankInformationMain;
}();

exports.default = BankInformationMain;
//# sourceMappingURL=bankInformation.main.js.map