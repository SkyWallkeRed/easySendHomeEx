'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('static/components/part-one/src/to-do-item.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var template = document.createElement('template');
template.innerHTML = '\n    <style>\n        :host {\n            display: block;\n            font-family: sans-serif;\n            text-align: center;\n        }\n\n        button {\n            border: none;\n            cursor: pointer;\n        }\n\n        ul {\n            list-style: none;\n            padding: 0;\n        }\n    </style>\n    <h3>Raw web components</h3>\n    <br>\n    <h1>To do</h1>\n    <form id="todo-input">\n        <input type="text" placeholder="Add a new to do"></input>\n        <button>\u2705</button>\n    </form>\n\n    <ul id="todos"></ul>\n';

var TodoApp = function (_HTMLElement) {
    _inherits(TodoApp, _HTMLElement);

    function TodoApp() {
        _classCallCheck(this, TodoApp);

        var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this));

        _this._shadowRoot = _this.attachShadow({ 'mode': 'open' });
        _this._shadowRoot.appendChild(template.content.cloneNode(true));

        _this.$todoList = _this._shadowRoot.querySelector('ul');
        _this.$input = _this._shadowRoot.querySelector('input');

        _this.$submitButton = _this._shadowRoot.querySelector('button');
        _this.$submitButton.addEventListener('click', _this._addTodo.bind(_this));
        return _this;
    }

    _createClass(TodoApp, [{
        key: '_removeTodo',
        value: function _removeTodo(e) {
            this._todos.splice(e.detail, 1);
            this._renderTodoList();
        }
    }, {
        key: '_toggleTodo',
        value: function _toggleTodo(e) {
            var todo = this._todos[e.detail];
            this._todos[e.detail] = Object.assign({}, todo, {
                checked: !todo.checked
            });
            this._renderTodoList();
        }
    }, {
        key: '_addTodo',
        value: function _addTodo() {
            if (this.$input.value.length > 0) {
                this._todos.push({ text: this.$input.value, checked: false });
                this._renderTodoList();
                this.$input.value = '';
            }
        }
    }, {
        key: '_renderTodoList',
        value: function _renderTodoList() {
            var _this2 = this;

            this.$todoList.innerHTML = '';

            this._todos.forEach(function (todo, index) {
                var $todoItem = document.createElement('to-do-item');
                $todoItem.setAttribute('text', todo.text);

                if (todo.checked) {
                    $todoItem.setAttribute('checked', '');
                }

                $todoItem.setAttribute('index', index);

                $todoItem.addEventListener('onRemove', _this2._removeTodo.bind(_this2));
                $todoItem.addEventListener('onToggle', _this2._toggleTodo.bind(_this2));

                _this2.$todoList.appendChild($todoItem);
            });
        }
    }, {
        key: 'todos',
        set: function set(value) {
            this._todos = value;
            this._renderTodoList();
        },
        get: function get() {
            return this._todos;
        }
    }]);

    return TodoApp;
}(HTMLElement);

window.customElements.define('to-do-app', TodoApp);
//# sourceMappingURL=to-do-app.js.map