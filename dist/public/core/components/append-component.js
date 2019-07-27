'use strict';

function getUrl() {
	var url = window.location.href;
	url = url.split('/index')[0];
	return url;
}

function appendTagComponent(element, componentPath, componentName, url) {

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url + '/' + componentPath + '/' + componentName + '.html', true);
	xhr.onreadystatechange = function () {
		if (this.readyState !== 4) return;
		if (this.status !== 200) return;
		element.innerHTML = this.responseText;
	};
	xhr.send();
}

function appendComponent(componentPath) {
	var url = getUrl();
	var pathArray = componentPath.split('/');
	var componentName = pathArray[pathArray.length - 1];
	var elements = document.getElementsByTagName(componentName);
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var element = _step.value;

			appendTagComponent(element, componentPath, componentName, url);
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
//# sourceMappingURL=append-component.js.map
