'use strict';

export default class AboutCtrl {
  constructor() {}

  loadPage(req, res) {
    let title   = 'About Sinais';
    let session = req.session;
    console.log(session);
    res.render('about/index', {title, session});
  }
}
