'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contacts = (function () {
  function Contacts() {
    _classCallCheck(this, Contacts);
  }

  _createClass(Contacts, [{
    key: 'loadPage',
    value: function loadPage(req, res) {
      var title = 'Contacts';
      res.render('contacts/index', { title: title });
    }
  }]);

  return Contacts;
})();

exports.default = Contacts;
