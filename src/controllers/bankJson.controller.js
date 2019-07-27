import * as _ from 'lodash';
import BankInformation from '../services/bankInformation/bankInformationService'

exports.getBanksJson = async function (req, res, next) {
    const result = await BankInformation.getInformationBank();
    res.send(result);
};

exports.getBankBy_bankCode = async function (req, res, next) {
    // TODO: get code in params
    const code = 11;
    const result = await BankInformation.getInformationByBankCode(code);
    res.send(result);
    console.log(`data by bank Code: ${code} | results: `, result.length);
};

exports.getBankBy_bankName = async function (req, res, next) {
    // TODO: get search string in params
    const searchString = req.query.name_string;
    const result = await BankInformation.getInformationByBankName(searchString);
    res.send(result);
    console.log(`data by bank name: ${searchString} | results: `, result.length);
};

exports.getFilterOptions = async function (req, res, next) {
    const result = await BankInformation.getFilterPreSet();
    res.send(result);
};

exports.getBankByQuery = async function (req, res, next) {
    // console.log(req.query);
    const bank_code = req.query.bank_code;
    const branch_code = req.query.branch_code;
    const name_string = req.query.name_string;

    // console.log(bank_code, branch_code, name_string);
    const query = {
        bank_code: bank_code,
        branch_code: branch_code,
        name_string: name_string,
    };
    const result = await BankInformation.getBankByQuery(query);


    res.send(result);
};


