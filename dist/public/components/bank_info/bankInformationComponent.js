'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExampleComponent = function () {
    _createClass(ExampleComponent, [{
        key: 'init',
        value: function init(container) {
            this.container = container;
            this.titleValue = this.container.dataset.title;
            this.getFilterParams();
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            this.container.innerHTML = this.markup(this);
            this.addEventListeners();
        }
    }, {
        key: 'markup',
        value: function markup(_ref) {
            var title = _ref.title;

            return '\n            <div class="navContainer" id="navContainer">\n            <h3 class="title">' + title + '</h3>\n                  <input class="input-css" type="text" id="textInput">\n                  <select class="select-css" id="bankSelect">\n                     <option value="">Bank Code</option>         \n                  </select>     \n                  <select class="select-css" id="branchSelect">\n                        <option value="">Branch Code</option>\n                  </select>\n            <button class="input-css" type="button" id="submitSearchBtn">go</button>\n            \n                <div class="singleResultContainer" id="singleResultContainer"></div>\n        </div>\n        \n            <div id="resultContainer"></div>\n    ';
        }
    }, {
        key: 'buildFilterDropDown',
        value: function buildFilterDropDown(option) {
            // {bankCodeArray:[num], branchCodeArray:[num]}
            var selectBank = document.getElementById('bankSelect');
            var branchSelect = document.getElementById('branchSelect');
            var bankOptions = option.bankCodeArray;
            var branchoptions = option.branchCodeArray;

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
    }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
            var _this = this;

            var btn = document.getElementById('submitSearchBtn');
            var textInput = document.getElementById('textInput');
            var bankCode = document.getElementById('bankSelect');
            var branchNumber = document.getElementById('branchSelect');

            btn.addEventListener('click', function () {
                var query = {
                    text: textInput.value || '',
                    bankCode: bankCode.value || '',
                    branchNumber: branchNumber.value || ''
                };
                _this.bankApi(query);
                _this.container.dispatchEvent(new CustomEvent('click-me-was-clicked'));
            });
        }
    }, {
        key: 'title',
        set: function set(title) {
            this.titleValue = title;
            this.render();
        },
        get: function get() {
            return 'Bank Of Israel Information';
        }
    }]);

    function ExampleComponent(container) {
        _classCallCheck(this, ExampleComponent);

        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            ExampleComponent.refs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            return ExampleComponent.refs[container.dataset.ref];
        }
    }

    _createClass(ExampleComponent, [{
        key: 'getFilterParams',
        value: function getFilterParams() {
            var scope = this;
            var apiUrl = '/api/public/bankJson/filter_params';
            var xhr = new XMLHttpRequest(); // the constructor has no arguments
            xhr.open('GET', '' + apiUrl);
            xhr.send();
            // 4. This will be called after the response is received
            xhr.onload = function () {
                if (xhr.status != 200) {
                    // analyze HTTP status of the response
                    console.log('Error ' + xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
                } else {
                    // show the result
                    console.log('Done, got ' + xhr.response.length + ' bytes'); // responseText is the server
                }
            };

            xhr.onprogress = function (event) {
                if (event.lengthComputable) {
                    var data = JSON.parse(event.currentTarget.response);
                    scope.buildFilterDropDown(data);
                    return data;
                } else {
                    console.log('Received ' + event.loaded + ' bytes'); // no Content-Length
                }
            };

            xhr.onerror = function () {
                console.log("Request failed");
            };
        }
    }, {
        key: 'bankApi',
        value: function bankApi(query) {
            // make interface
            var scope = this;

            var apiUrl = '/api/public/bankJson';
            var baseUrl = '/api/public/bankJson';
            var byQuery = '/query';
            var byName = '/by_name';
            var byCode = '/by_code';

            apiUrl = '' + baseUrl;
            if (query.text || query.bankCode || query.branchNumber) {
                apiUrl = apiUrl + (byQuery + '?');
            }
            if (query.text) {
                apiUrl = apiUrl + ('name_string=' + query.text + '&');
            }
            if (query.bankCode) {
                apiUrl = apiUrl + ('bank_code=' + query.bankCode + '&');
            }
            if (query.branchNumber) {
                apiUrl = apiUrl + ('branch_code=' + query.branchNumber);
            }
            console.log('apiUrl', apiUrl);
            var xhr = new XMLHttpRequest(); // the constructor has no arguments
            xhr.open('GET', '' + apiUrl);
            xhr.send();
            // 4. This will be called after the response is received
            xhr.onload = function () {
                if (xhr.status != 200) {
                    // analyze HTTP status of the response
                    console.log('Error ' + xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
                } else {
                    // show the result
                    console.log('Done, got ' + xhr.response.length + ' bytes'); // responseText is the server
                }
            };

            xhr.onprogress = function (event) {
                scope.buildResult([]);

                if (event.lengthComputable) {
                    var data = JSON.parse(event.currentTarget.response);
                    scope.buildResult(data);
                    console.log('server responce with ok, ' + data.length + ' results');
                } else {
                    console.log('Received ' + event.loaded + ' bytes'); // no Content-Length
                }
            };

            xhr.onerror = function () {
                console.log("Request failed");
            };
        }
    }, {
        key: 'buildExtendedResult',
        value: function buildExtendedResult(result) {
            var singleResultContainer = document.getElementById('singleResultContainer');
            singleResultContainer.innerHTML = '';
            var template = '\n            <div class="textContainer">\n            <p>' + result.Bank_Name + '</p>\n            <p>' + result.Branch_Address + '</p>\n            <p>' + result.City + '</p>\n            <p>' + result.Telephone + '</p>\n            </div>\n            <div style=" max-height: 200px" id="map"></div>\n        ';
            singleResultContainer.insertAdjacentHTML('afterbegin', template);
            var cords = { lat: Number(result.Y_Coordinate), lng: Number(result.X_Coordinate) };
            this.initMap(cords);
        }
    }, {
        key: 'buildResult',
        value: function buildResult(data) {
            var scope = this;
            var resultContainer = document.getElementById("resultContainer");
            resultContainer.innerHTML = '';

            var _loop = function _loop(i) {
                var singlBank = '<div id="' + i + '"  class="bankInfoWrapper"> \n                            <h4  class="bankName">' + data[i].Bank_Name + '</h4>\n                            <span class="bankAddress">' + data[i].Branch_Address + '</span>\n                          </div>';

                resultContainer.insertAdjacentHTML('afterbegin', singlBank);
                document.getElementById('' + i).addEventListener('click', function () {
                    this.classList.add('expended');
                    scope.buildExtendedResult(data[i]);
                });
            };

            for (var i = 0; i < data.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: 'buildByTemplate',
        value: function buildByTemplate() {
            var newtemplate = '<div>\n                            <input type="text" placeholder="bank name">\n                            <button type="button">go</button>\n                         </div>';
            document.getElementById("resultContainer").innerHTML = newtemplate;
        }
    }, {
        key: 'buildExpandedInfo',
        value: function buildExpandedInfo(info) {
            // return ele to appendChild
            var expWraper = this.elementBuilder('div', 'wrapper');
            var name = this.buidEleWithText('p', 'name', info.Bank_Name);
            expWraper.appendChild(name);
            var address = this.buidEleWithText('p', 'adress', info.Branch_Address);
            expWraper.appendChild(address);

            return expWraper;
        }
    }, {
        key: 'buidEleWithText',
        value: function buidEleWithText(tag, className, stringContent) {
            var newEle = document.createElement('' + tag);
            newEle.classList.add('' + className);
            var text = document.createTextNode('' + stringContent);
            newEle.appendChild(text);
            return newEle;
        }
    }, {
        key: 'elementBuilder',
        value: function elementBuilder(tag, className) {
            var ele = document.createElement('' + tag);
            ele.classList.add('' + className);
            return ele;
        }
    }, {
        key: 'initMap',
        value: function initMap(cords) {
            var map = new google.maps.Map(document.getElementById('map'), { zoom: 14, center: cords });
            var marker = new google.maps.Marker({ position: cords, map: map });
        }
    }]);

    return ExampleComponent;
}();

ExampleComponent.refs = {};

document.addEventListener('DOMContentLoaded', function () {
    new ExampleComponent(document.getElementById('bank-information'));
});
//# sourceMappingURL=bankInformationComponent.js.map