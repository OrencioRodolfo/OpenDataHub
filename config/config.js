var path     = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env      = process.env.NODE_ENV || 'development';
    host     = '10.2.5.59';
var config = {
  development: {
    root: rootPath,
    encryption_key: 'Fasdf354Dfva5009f',
    web: {
    	site_url: 'http://'+host,
    	port:     3000
    },
    db: {
    	host:     'mongodb://'+host,
    	port:     27017,
    	database: 'sinais',
    	user:     '',
    	password: ''
    },
    fs: {
    	storage_folder: './file_storage/' // main path for file storage
    },
    rows_per_page: 50,
    mailer: {
    	host: 'imap.m-iti.org',
        port: 587,
        user: 'rodolfo.goncalves@m-iti.org',
        pass: 'rg1014'
    }
  },
  test: {
    encryption_key: 'Fasdf354Dfva5009f',
    web: {
    	site_url: 'http://'+host,
    	port:     3001
    },
    db: {
    	host:     'mongodb://'+host,
    	port:     27017,
    	database: 'sinais',
    	user:     '',
    	password: ''
    },
    fs: {
    	storage_folder: './file_storage/' // main path for file storage
    },
    rows_per_page: 50,
    mailer: {
    	host: 'imap.m-iti.org',
        port: 587,
        user: 'rodolfo.goncalves@m-iti.org',
        pass: 'rg1014'
    }
  },
  test: {
    root: rootPath,
    encryption_key: 'Fasdf354Dfva5009f',
    web: {
    	site_url: 'http://aveiro.m-iti.org',
    	port:     3000
    },
    db: {
    	host:     'mongodb://'+host,
    	port:     27017,
    	database: 'sinais',
    	user:     '',
    	password: ''
    },
    fs: {
    	storage_folder: './file_storage/' // main path for file storage
    },
    rows_per_page: 50,
    mailer: {
  	   host: 'imap.m-iti.org',
      port: 587,
      user: 'rodolfo.goncalves@m-iti.org',
      pass: 'rg1014'
    }
  },
  production: {
    root: rootPath,
    encryption_key: 'Fasdf354Dfva5009f',
    web: {
    	site_url: 'http://aveiro.m-iti.org',
    	port:     3000
    },
    db: {
    	host:     'mongodb://'+host,
    	port:     27017,
    	database: 'sinais',
    	user:     '',
    	password: ''
    },
    fs: {
    	storage_folder: './file_storage/' // main path for file storage
    },
    rows_per_page: 50,
    mailer: {
  	   host: 'imap.m-iti.org',
      port: 587,
      user: 'rodolfo.goncalves@m-iti.org',
      pass: 'rg1014'
    }
  }
};

module.exports = config[env];
