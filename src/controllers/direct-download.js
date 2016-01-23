'use strict';

export default class DirectDownloadCtrl {
  constructor() {}

  loadPage(req, res) {
    let title   = 'Download';
    let session = req.session;

    if (!req.session.logged_in)
      res.render('template/errorPage', {errors: ["Access denied"]});
    else
      res.render('directDownload/index');
  }
}
