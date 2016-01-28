'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DirectDownloadCtrl = function () {
  function DirectDownloadCtrl() {
    _classCallCheck(this, DirectDownloadCtrl);
  }

  _createClass(DirectDownloadCtrl, [{
    key: 'loadPage',
    value: function loadPage(req, res) {
      var title = 'Download';
      var session = req.session;

      if (!req.session.logged_in) res.render('template/errorPage', { errors: ["Access denied"] });else res.render('directDownload/index');
    }
  }]);

  return DirectDownloadCtrl;
}();

exports.default = DirectDownloadCtrl;
