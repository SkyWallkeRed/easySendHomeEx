'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExampleComponent = function () {
    _createClass(ExampleComponent, [{
        key: 'init',
        value: function init(container) {
            this.container = container;
            this.titleValue = this.container.dataset.title;
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            this.container.innerHTML = ExampleComponent.markup(this);
            this.pageElement = this.container.querySelector('.sub-component-example');
            // this.clickMeButton = this.container.querySelector('.click-me');
            // new AnotherExampleComponent(this.pageElement);

            this.addEventListeners();
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
            // this.clickMeButton().addEventListener('click', () =>
            //     this.container.dispatchEvent(new CustomEvent('click-me-was-clicked')));
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
    }], [{
        key: 'markup',
        value: function markup(_ref) {
            var title = _ref.title;

            return '\n        <div class="infoContainer">\n            <h3>' + title + '</h3>\n            <input type="text">\n            <button>go</button>\n        </div>\n    ';
        }
    }]);

    function ExampleComponent(container) {
        _classCallCheck(this, ExampleComponent);

        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            ExampleComponent.refs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return ExampleComponent.refs[container.dataset.ref];
        }
    }

    return ExampleComponent;
}();

ExampleComponent.refs = {};

document.addEventListener('DOMContentLoaded', function () {
    new ExampleComponent(document.getElementById('example-component'));
});
//# sourceMappingURL=bankInformationComponent.js.map
