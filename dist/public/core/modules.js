'use strict';

var components = [['static/core/components/append-component.js']];

var modules = [['static/core/app/first-component/first-component.js'], ['static/core/app/second-component/second-component.js']];

var scriptIndex = 0;

(function includeHTML() {

	function insertScript(source, callback) {
		var script = document.createElement('script');
		var prior = document.getElementsByTagName('script')[scriptIndex];
		scriptIndex++;
		script.async = 1;
		script.src = source;
		prior.parentNode.insertBefore(script, prior);
	}

	function importSources(sources) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var source = _step.value;

				insertScript(source, null);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	var promiseImportComponents = function promiseImportComponents() {
		return new Promise(function (resolve, reject) {
			resolve(importSources(components));
		});
	};

	(function importScripts() {
		promiseImportComponents().then(function () {
			setTimeout(function () {
				return importSources(modules);
			}, 0);
		});
	})();
})();
//# sourceMappingURL=modules.js.map