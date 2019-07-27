'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var template = document.createElement('template');
template.innerHTML = '\n    <style>\n        :host {\n            display: block;\n            font-family: sans-serif;\n        }\n\n        .completed {\n            text-decoration: line-through;\n        }\n\n        button {\n            border: none;\n            cursor: pointer;\n        }\n    </style>\n    <li class="item">\n        <input type="checkbox">\n        <label></label>\n        <button>\u274C</button>\n    </li>\n';

var TodoItem = function (_HTMLElement) {
    _inherits(TodoItem, _HTMLElement);

    function TodoItem() {
        _classCallCheck(this, TodoItem);

        var _this = _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).call(this));

        _this._shadowRoot = _this.attachShadow({ 'mode': 'open' });
        _this._shadowRoot.appendChild(template.content.cloneNode(true));

        _this.$item = _this._shadowRoot.querySelector('.item');
        _this.$removeButton = _this._shadowRoot.querySelector('button');
        _this.$text = _this._shadowRoot.querySelector('label');
        _this.$checkbox = _this._shadowRoot.querySelector('input');

        _this.$removeButton.addEventListener('click', function (e) {
            _this.dispatchEvent(new CustomEvent('onRemove', { detail: _this.index }));
        });

        _this.$checkbox.addEventListener('click', function (e) {
            _this.dispatchEvent(new CustomEvent('onToggle', { detail: _this.index }));
        });
        return _this;
    }

    _createClass(TodoItem, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            if (!this.hasAttribute('text')) {
                this.setAttribute('text', 'placeholder');
            }

            this._renderTodoItem();
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'text':
                    this._text = newValue;
                    break;
                case 'checked':
                    this._checked = this.hasAttribute('checked');
                    break;
                case 'index':
                    this._index = parseInt(newValue);
                    break;
            }
        }
    }, {
        key: '_renderTodoItem',
        value: function _renderTodoItem() {
            if (this.hasAttribute('checked')) {
                this.$item.classList.add('completed');
                this.$checkbox.setAttribute('checked', '');
            } else {
                this.$item.classList.remove('completed');
                this.$checkbox.removeAttribute('checked');
            }

            this.$text.innerHTML = this._text;
        }
    }, {
        key: 'index',
        set: function set(val) {
            this.setAttribute('index', val);
        },
        get: function get() {
            return this._index;
        }
    }, {
        key: 'checked',
        get: function get() {
            return this.hasAttribute('checked');
        },
        set: function set(val) {
            if (val) {
                this.setAttribute('checked', '');
            } else {
                this.removeAttribute('checked');
            }
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return ['text', 'checked', 'index'];
        }
    }]);

    return TodoItem;
}(HTMLElement);

window.customElements.define('to-do-item', TodoItem);
//# sourceMappingURL=to-do-item.js.map