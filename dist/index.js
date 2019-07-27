'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// support async/await
var api_public = require('./routes/api-public.route');
var client = require('./routes/client.route');

var app = (0, _express2.default)();
app.use('/static', _express2.default.static(_path2.default.join(__dirname, './public')));

app.server = _http2.default.createServer(app);

app.use((0, _morgan2.default)('dev')); // logger
app.use((0, _cors2.default)({ exposedHeaders: _config2.default.corsHeaders }));
app.use(_bodyParser2.default.json({ limit: _config2.default.bodyLimit }));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/api/public/', api_public);
app.use('/', client);

app.server.listen(process.env.PORT || _config2.default.port, function () {
    console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map