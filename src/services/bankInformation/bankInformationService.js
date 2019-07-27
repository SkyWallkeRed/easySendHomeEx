import BankInformationMain from '../../services/bankInformation/bankInformation.main'
import config from './config'
import * as _ from 'lodash';

const BI = new BankInformationMain(config.bankInformationUrl);


class BankInformationService {
    informationBank;

    async getInformationBank() {
        this.informationBank = await BI.getInformationBank();
        return this.informationBank;
    }

    async getInformationByBankCode(code) { // code: number
        if (!this.informationBank) {
            this.informationBank = await this.getInformationBank();
        }
        return _.filter(this.informationBank, {Bank_Code: String(code)});
    }

    async getInformationByBankName(searchString) { // searchString: string
        if (!this.informationBank) {
            this.informationBank = await this.getInformationBank();
        }
        const resultArray = [];
        for (let bank of this.informationBank) {
            if (_.includes(bank.Bank_Name, searchString)) {
                resultArray.push(bank);
            }
        }

        return resultArray;
    }

    async getFilterPreSet() { // get preset of search params

        if (!this.informationBank) {
            this.informationBank = await this.getInformationBank();
        }

        const bankCodeArray = [];
        const branchCodeArray = [];
        for (let bank of this.informationBank) {
            bankCodeArray.push(Number(bank.Bank_Code));
            branchCodeArray.push(Number(bank.Branch_Code));
        }
        let unique_bankCodeArray = [...new Set(bankCodeArray)];
        let unique_branchCodeArray = [...new Set(branchCodeArray)];

        return {
            bankCodeArray: unique_bankCodeArray.sort(sortNumber),
            branchCodeArray: unique_branchCodeArray.sort(sortNumber)
        };

        function sortNumber(a, b) {
            return a - b;
        }
    }

    async getBankByQuery(query) { // add type
        if (!this.informationBank) {
            this.informationBank = await this.getInformationBank();
        }
        const name_string = query.name_string ? query.name_string : '';
        const branch_code = query.branch_code ? query.branch_code : '';
        const bank_code = query.bank_code ? query.bank_code : '';
        const result = [];

        const searchMod = {
            name: (!!query.name_string),
            bankCode: (!!query.bank_code),
            branchNumber: (!!query.branch_code)
        };

        for (let bank of this.informationBank) {
            const bankMatchResult = {
                name: false,
                bankCode: false,
                branchNumber: false
            };

            if (searchMod.name) {
                const match = filterByName(bank, name_string);
                if (match) {
                    bankMatchResult.name = true;
                }
            }
            if (searchMod.bankCode) {
                const match = filterByBankCode(bank, bank_code);
                if (match) {
                    bankMatchResult.bankCode = true;
                }
            }
            if (searchMod.branchNumber) {
                const match = filterByBranchNumber(bank, branch_code);
                if (match) {
                    bankMatchResult.branchNumber = true;
                }
            }
            if (_.isEqual(searchMod, bankMatchResult)) {
                result.push(bank);
            }
        }
        return result;
    }
}

function filterByName(bank, nameString) { // string
    if (_.includes(bank.Bank_Name, nameString)) {
        return bank;
    } else {
        return false;
    }
}

function filterByBankCode(bank, code) { // num string
    if (bank.Bank_Code === code) {
        return bank;
    }
}

function filterByBranchNumber(bank, code) { // num string
    if (bank.Branch_Code === code) {
        return bank;
    }
}

const bankInformationService = new BankInformationService();
export default bankInformationService;
