'use strict';

export default class About {
  constructor() {}

  loadPage(req, res) {
    let title = 'About Sinais';

    if (!req.session.logged_in)
      res.render('about/index', {title});
  	else
  		res.render('dataConsult/index', {title}); 
  }
}
