'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContactsCtrl = function () {
  function ContactsCtrl() {
    _classCallCheck(this, ContactsCtrl);
  }

  _createClass(ContactsCtrl, [{
    key: 'loadPage',
    value: function loadPage(req, res) {
      var title = 'Contacts';
      var session = req.session;

      res.render('contacts/index', { title: title, session: session });
    }
  }]);

  return ContactsCtrl;
}();

exports.default = ContactsCtrl;