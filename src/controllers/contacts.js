'use strict';

export default class ContactsCtrl {
  constructor() {}

  loadPage(req, res) {
    let title = 'Contacts';
    res.render('contacts/index', {title});
  }
}
