'use strict';

/*global templates */

vanilla.infoBankContainer = function (templates, list) {

  function render(props, done) {
    templates.load('./infoBankContainer.html', function (el) {

      list.render(props, function (child) {
        el.appendChild(child);

        if (done) {
          done(el);
        }
      });
    });
  }

  return {
    render: render
  };
}(templates, vanilla.list);
//# sourceMappingURL=infoBankContainer.js.map
