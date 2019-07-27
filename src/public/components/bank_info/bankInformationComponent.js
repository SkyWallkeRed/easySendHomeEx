class ExampleComponent {

    set title(title) {
        this.titleValue = title;
        this.render();
    }

    get title() {
        return 'Bank Of Israel Information';
    }

    init(container) {
        this.container = container;
        this.titleValue = this.container.dataset.title;
        this.getFilterParams();
        this.render();
    }

    render() {
        this.container.innerHTML = this.markup(this);
        this.addEventListeners();
    }

    markup({title}) {
        return `
            <div class="navContainer" id="navContainer">
            <h3 class="title">${title}</h3>
                  <input class="input-css" type="text" id="textInput">
                  <select class="select-css" id="bankSelect">
                     <option value="">Bank Code</option>         
                  </select>     
                  <select class="select-css" id="branchSelect">
                        <option value="">Branch Code</option>
                  </select>
            <button class="input-css" type="button" id="submitSearchBtn">go</button>
            
                <div class="singleResultContainer" id="singleResultContainer"></div>
        </div>
        
            <div id="resultContainer"></div>
    `;
    }

    buildFilterDropDown(option) { // {bankCodeArray:[num], branchCodeArray:[num]}
        const selectBank = document.getElementById('bankSelect');
        const branchSelect = document.getElementById('branchSelect');
        const bankOptions = option.bankCodeArray;
        const branchoptions = option.branchCodeArray;

        bankOptions.forEach(function (item) {
            option = document.createElement('option');
            option.value = option.textContent = item;
            selectBank.appendChild(option);
        });

        branchoptions.forEach(function (item) {
            option = document.createElement('option');
            option.value = option.textContent = item;
            branchSelect.appendChild(option);
        });
    }

    addEventListeners() {
        const btn = document.getElementById('submitSearchBtn');
        const textInput = document.getElementById('textInput');
        const bankCode = document.getElementById('bankSelect');
        const branchNumber = document.getElementById('branchSelect');

        btn.addEventListener('click', () => {
            const query = {
                text: textInput.value || '',
                bankCode: bankCode.value || '',
                branchNumber: branchNumber.value || ''
            };
            this.bankApi(query);
            this.container.dispatchEvent(new CustomEvent('click-me-was-clicked'));
        });

    }

    constructor(container) {
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            ExampleComponent.refs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            return ExampleComponent.refs[container.dataset.ref];
        }

    }

    getFilterParams() {
        const scope = this;
        const apiUrl = '/api/public/bankJson/filter_params';
        let xhr = new XMLHttpRequest(); // the constructor has no arguments
        xhr.open('GET', `${apiUrl}`);
        xhr.send();
        // 4. This will be called after the response is received
        xhr.onload = function () {
            if (xhr.status != 200) { // analyze HTTP status of the response
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
                console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
            }
        };

        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                const data = JSON.parse(event.currentTarget.response);
                scope.buildFilterDropDown(data);
                return data;
            } else {
                console.log(`Received ${event.loaded} bytes`); // no Content-Length
            }

        };

        xhr.onerror = function () {
            console.log("Request failed");
        };
    }

    bankApi(query) { // make interface
        const scope = this;

        let apiUrl = '/api/public/bankJson';
        const baseUrl = '/api/public/bankJson';
        const byQuery = '/query';
        const byName = '/by_name';
        const byCode = '/by_code';

        apiUrl = `${baseUrl}`;
        if (query.text || query.bankCode || query.branchNumber) {
            apiUrl = apiUrl + `${byQuery}?`;
        }
        if (query.text) {
            apiUrl = apiUrl + `name_string=${query.text}&`;
        }
        if (query.bankCode) {
            apiUrl = apiUrl + `bank_code=${query.bankCode}&`;
        }
        if (query.branchNumber) {
            apiUrl = apiUrl + `branch_code=${query.branchNumber}`;
        }
        console.log('apiUrl', apiUrl);
        let xhr = new XMLHttpRequest(); // the constructor has no arguments
        xhr.open('GET', `${apiUrl}`);
        xhr.send();
        // 4. This will be called after the response is received
        xhr.onload = function () {
            if (xhr.status != 200) { // analyze HTTP status of the response
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
                console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
            }
        };

        xhr.onprogress = function (event) {
            scope.buildResult([]);

            if (event.lengthComputable) {
                const data = JSON.parse(event.currentTarget.response);
                scope.buildResult(data);
                console.log(`server responce with ok, ${ data.length } results`,);
            } else {
                console.log(`Received ${event.loaded} bytes`); // no Content-Length
            }
        };

        xhr.onerror = function () {
            console.log("Request failed");
        };
    }

    buildExtendedResult(result) {
        const singleResultContainer = document.getElementById('singleResultContainer');
        singleResultContainer.innerHTML = '';
        const template = `
            <div class="textContainer">
            <p>${result.Bank_Name}</p>
            <p>${result.Branch_Address}</p>
            <p>${result.City}</p>
            <p>${result.Telephone}</p>
            </div>
            <div style=" max-height: 200px" id="map"></div>
        `;
        singleResultContainer.insertAdjacentHTML('afterbegin', template);
        const cords = {lat: Number(result.Y_Coordinate), lng: Number(result.X_Coordinate)};
        this.initMap(cords);
    }

    buildResult(data) {
        const scope = this;
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            const singlBank = `<div id="${i}"  class="bankInfoWrapper"> 
                            <h4  class="bankName">${data[i].Bank_Name}</h4>
                            <span class="bankAddress">${data[i].Branch_Address}</span>
                          </div>`;

            resultContainer.insertAdjacentHTML('afterbegin', singlBank);
            document.getElementById(`${i}`).addEventListener('click', function () {
                this.classList.add('expended');
                scope.buildExtendedResult(data[i]);
            });
        }
    }

    buildByTemplate() {
        const newtemplate = `<div>
                            <input type="text" placeholder="bank name">
                            <button type="button">go</button>
                         </div>`;
        document.getElementById("resultContainer").innerHTML = newtemplate;
    }

    buildExpandedInfo(info) { // return ele to appendChild
        const expWraper = this.elementBuilder('div', 'wrapper');
        const name = this.buidEleWithText('p', 'name', info.Bank_Name);
        expWraper.appendChild(name);
        const address = this.buidEleWithText('p', 'adress', info.Branch_Address);
        expWraper.appendChild(address);

        return expWraper;
    }

    buidEleWithText(tag, className, stringContent) {
        const newEle = document.createElement(`${tag}`);
        newEle.classList.add(`${className}`);
        const text = document.createTextNode(`${stringContent}`);
        newEle.appendChild(text);
        return newEle;
    }

    elementBuilder(tag, className) {
        const ele = document.createElement(`${tag}`);
        ele.classList.add(`${className}`);
        return ele;
    }

    initMap(cords) {
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 14, center: cords});
        var marker = new google.maps.Marker({position: cords, map: map});
    }
}

ExampleComponent.refs = {};

document.addEventListener('DOMContentLoaded', () => {
    new ExampleComponent(document.getElementById('bank-information'))
});
