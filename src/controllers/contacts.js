'use strict';

export default class ContactsCtrl {
  constructor() {}

  loadPage(req, res) {
    let title   = 'Contacts';
    let session = req.session;

    res.render('contacts/index', {title, session});
  }
}
