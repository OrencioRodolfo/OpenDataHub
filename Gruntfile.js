'use strict';


var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    less: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.less'
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'src/**/*.js',
          'config/*.js',
          'public/js/**/*.js'
        ],
        tasks: ['babel', 'browserify', 'develop', 'delayed-livereload']
      },
      css: {
        files: [
          'public/css/*.less'
        ],
        tasks: ['less'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'src/views/*.jade',
          'src/views/**/*.jade'
        ],
        options: { livereload: reloadPort },
        tasks: ['sync']
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.js'],
          dest: 'app/'
        },
        {
          expand: true,
          src: ['src/*.js'],
          dest: '*.js'
        }]
      }
    },
    sync: {
      main: {
        files: [{
          cwd: 'src',
          src: [
            'views/**'
          ],
          dest: 'app/',
        }],
        verbose: true, // Display log messages when copying files
        failOnError: true
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'public/js/min/allinone.min.js': ['public/js/*.js']
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'public/build/user-bundle.js': ['public/js/user/*.js'],
          'public/build/explorer-bundle.js': ['public/js/explorer/*.js'],
          'public/build/common-bundle.js': ['public/js/common/*.js'],
          'public/build/about-bundle.js': ['public/js/about/*.js']
        },
        options: {
          transform: ['debowerify']
        }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['babel', 'sync', 'less', 'uglify', 'browserify', 'develop', 'watch']);
};
