'use strict';

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _bankInformationService = require('../services/bankInformation/bankInformationService');

var _bankInformationService2 = _interopRequireDefault(_bankInformationService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.getBanksJson = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _bankInformationService2.default.getInformationBank();

                    case 2:
                        result = _context.sent;

                        res.send(result);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

exports.getBankBy_bankCode = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var code, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        // TODO: get code in params
                        code = 11;
                        _context2.next = 3;
                        return _bankInformationService2.default.getInformationByBankCode(code);

                    case 3:
                        result = _context2.sent;

                        res.send(result);
                        console.log('data by bank Code: ' + code + ' | results: ', result.length);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

exports.getBankBy_bankName = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var searchString, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        // TODO: get search string in params
                        searchString = req.query.name_string;
                        _context3.next = 3;
                        return _bankInformationService2.default.getInformationByBankName(searchString);

                    case 3:
                        result = _context3.sent;

                        res.send(result);
                        console.log('data by bank name: ' + searchString + ' | results: ', result.length);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}();

exports.getFilterOptions = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _bankInformationService2.default.getFilterPreSet();

                    case 2:
                        result = _context4.sent;

                        res.send(result);

                    case 4:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function (_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
    };
}();

exports.getBankByQuery = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
        var bank_code, branch_code, name_string, query, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        // console.log(req.query);
                        bank_code = req.query.bank_code;
                        branch_code = req.query.branch_code;
                        name_string = req.query.name_string;

                        // console.log(bank_code, branch_code, name_string);

                        query = {
                            bank_code: bank_code,
                            branch_code: branch_code,
                            name_string: name_string
                        };
                        _context5.next = 6;
                        return _bankInformationService2.default.getBankByQuery(query);

                    case 6:
                        result = _context5.sent;


                        res.send(result);

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function (_x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=bankJson.controller.js.map