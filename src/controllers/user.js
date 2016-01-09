'use strict';

export default class UserCtrl {
  constructor() {}

  loadPage(req, res) {
    let title = 'Contacts';
    res.render('contacts/index', {title});
  }
}
