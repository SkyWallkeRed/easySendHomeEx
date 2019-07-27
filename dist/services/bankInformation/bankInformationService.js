'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bankInformation = require('../../services/bankInformation/bankInformation.main');

var _bankInformation2 = _interopRequireDefault(_bankInformation);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BI = new _bankInformation2.default(_config2.default.bankInformationUrl);

var BankInformationService = function () {
    function BankInformationService() {
        _classCallCheck(this, BankInformationService);
    }

    _createClass(BankInformationService, [{
        key: 'getInformationBank',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return BI.getInformationBank();

                            case 2:
                                this.informationBank = _context.sent;
                                return _context.abrupt('return', this.informationBank);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInformationBank() {
                return _ref.apply(this, arguments);
            }

            return getInformationBank;
        }()
    }, {
        key: 'getInformationByBankCode',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(code) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (this.informationBank) {
                                    _context2.next = 4;
                                    break;
                                }

                                _context2.next = 3;
                                return this.getInformationBank();

                            case 3:
                                this.informationBank = _context2.sent;

                            case 4:
                                return _context2.abrupt('return', _.filter(this.informationBank, { Bank_Code: String(code) }));

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getInformationByBankCode(_x) {
                return _ref2.apply(this, arguments);
            }

            return getInformationByBankCode;
        }()
    }, {
        key: 'getInformationByBankName',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchString) {
                var resultArray, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, bank;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (this.informationBank) {
                                    _context3.next = 4;
                                    break;
                                }

                                _context3.next = 3;
                                return this.getInformationBank();

                            case 3:
                                this.informationBank = _context3.sent;

                            case 4:
                                resultArray = [];
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context3.prev = 8;

                                for (_iterator = this.informationBank[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    bank = _step.value;

                                    if (_.includes(bank.Bank_Name, searchString)) {
                                        resultArray.push(bank);
                                    }
                                }

                                _context3.next = 16;
                                break;

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](8);
                                _didIteratorError = true;
                                _iteratorError = _context3.t0;

                            case 16:
                                _context3.prev = 16;
                                _context3.prev = 17;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 19:
                                _context3.prev = 19;

                                if (!_didIteratorError) {
                                    _context3.next = 22;
                                    break;
                                }

                                throw _iteratorError;

                            case 22:
                                return _context3.finish(19);

                            case 23:
                                return _context3.finish(16);

                            case 24:
                                return _context3.abrupt('return', resultArray);

                            case 25:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[8, 12, 16, 24], [17,, 19, 23]]);
            }));

            function getInformationByBankName(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getInformationByBankName;
        }()
    }, {
        key: 'getFilterPreSet',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var bankCodeArray, branchCodeArray, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, bank, unique_bankCodeArray, unique_branchCodeArray, sortNumber;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                sortNumber = function sortNumber(a, b) {
                                    return a - b;
                                };

                                if (this.informationBank) {
                                    _context4.next = 5;
                                    break;
                                }

                                _context4.next = 4;
                                return this.getInformationBank();

                            case 4:
                                this.informationBank = _context4.sent;

                            case 5:
                                bankCodeArray = [];
                                branchCodeArray = [];
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context4.prev = 10;

                                for (_iterator2 = this.informationBank[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    bank = _step2.value;

                                    bankCodeArray.push(Number(bank.Bank_Code));
                                    branchCodeArray.push(Number(bank.Branch_Code));
                                }
                                _context4.next = 18;
                                break;

                            case 14:
                                _context4.prev = 14;
                                _context4.t0 = _context4['catch'](10);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context4.t0;

                            case 18:
                                _context4.prev = 18;
                                _context4.prev = 19;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 21:
                                _context4.prev = 21;

                                if (!_didIteratorError2) {
                                    _context4.next = 24;
                                    break;
                                }

                                throw _iteratorError2;

                            case 24:
                                return _context4.finish(21);

                            case 25:
                                return _context4.finish(18);

                            case 26:
                                unique_bankCodeArray = [].concat(_toConsumableArray(new Set(bankCodeArray)));
                                unique_branchCodeArray = [].concat(_toConsumableArray(new Set(branchCodeArray)));
                                return _context4.abrupt('return', {
                                    bankCodeArray: unique_bankCodeArray.sort(sortNumber),
                                    branchCodeArray: unique_branchCodeArray.sort(sortNumber)
                                });

                            case 29:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[10, 14, 18, 26], [19,, 21, 25]]);
            }));

            function getFilterPreSet() {
                return _ref4.apply(this, arguments);
            }

            return getFilterPreSet;
        }()
    }, {
        key: 'getBankByQuery',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(query) {
                var name_string, branch_code, bank_code, result, searchMod, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, bank, bankMatchResult, match, _match, _match2;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (this.informationBank) {
                                    _context5.next = 4;
                                    break;
                                }

                                _context5.next = 3;
                                return this.getInformationBank();

                            case 3:
                                this.informationBank = _context5.sent;

                            case 4:
                                name_string = query.name_string ? query.name_string : '';
                                branch_code = query.branch_code ? query.branch_code : '';
                                bank_code = query.bank_code ? query.bank_code : '';
                                result = [];
                                searchMod = {
                                    name: !!query.name_string,
                                    bankCode: !!query.bank_code,
                                    branchNumber: !!query.branch_code
                                };
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;
                                _context5.prev = 12;


                                for (_iterator3 = this.informationBank[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    bank = _step3.value;
                                    bankMatchResult = {
                                        name: false,
                                        bankCode: false,
                                        branchNumber: false
                                    };


                                    if (searchMod.name) {
                                        match = filterByName(bank, name_string);

                                        if (match) {
                                            bankMatchResult.name = true;
                                        }
                                    }
                                    if (searchMod.bankCode) {
                                        _match = filterByBankCode(bank, bank_code);

                                        if (_match) {
                                            bankMatchResult.bankCode = true;
                                        }
                                    }
                                    if (searchMod.branchNumber) {
                                        _match2 = filterByBranchNumber(bank, branch_code);

                                        if (_match2) {
                                            bankMatchResult.branchNumber = true;
                                        }
                                    }
                                    if (_.isEqual(searchMod, bankMatchResult)) {
                                        result.push(bank);
                                    }
                                }
                                _context5.next = 20;
                                break;

                            case 16:
                                _context5.prev = 16;
                                _context5.t0 = _context5['catch'](12);
                                _didIteratorError3 = true;
                                _iteratorError3 = _context5.t0;

                            case 20:
                                _context5.prev = 20;
                                _context5.prev = 21;

                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }

                            case 23:
                                _context5.prev = 23;

                                if (!_didIteratorError3) {
                                    _context5.next = 26;
                                    break;
                                }

                                throw _iteratorError3;

                            case 26:
                                return _context5.finish(23);

                            case 27:
                                return _context5.finish(20);

                            case 28:
                                return _context5.abrupt('return', result);

                            case 29:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[12, 16, 20, 28], [21,, 23, 27]]);
            }));

            function getBankByQuery(_x3) {
                return _ref5.apply(this, arguments);
            }

            return getBankByQuery;
        }()
    }]);

    return BankInformationService;
}();

function filterByName(bank, nameString) {
    // string
    if (_.includes(bank.Bank_Name, nameString)) {
        return bank;
    } else {
        return false;
    }
}

function filterByBankCode(bank, code) {
    // num string
    if (bank.Bank_Code === code) {
        return bank;
    }
}

function filterByBranchNumber(bank, code) {
    // num string
    if (bank.Branch_Code === code) {
        return bank;
    }
}

var bankInformationService = new BankInformationService();
exports.default = bankInformationService;
//# sourceMappingURL=bankInformationService.js.map