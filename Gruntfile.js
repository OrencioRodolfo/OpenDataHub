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
        file: 'app.js',
        nodeArgs: ['--debug']
      }
    },
    less: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'public/less',
            // Compile each LESS component excluding "bootstrap.less",
            // "mixins.less" and "variables.less"
            src: ['**/*.less'],
            dest: 'public/css/',
            ext: '.css'
          }
        ]
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
          'public/js/**/*'
        ],
        tasks: ['babel', 'browserify', 'develop', 'delayed-livereload']
      },
      css: {
        files: [
          'public/less/**/*.less'
        ],
        tasks: ['less'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
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
    browserify: {
      dist: {
        files: {
          'public/build/user-bundle.js': ['public/js/user/**/*.js'],
          'public/build/explorer-bundle.js': ['public/js/explorer/**/*.js'],
          'public/build/common-bundle.js': ['public/js/common/**/*.js'],
          'public/build/about-bundle.js': ['public/js/about/**/*.js'],
          'public/build/app.js': ['public/js/app.js']
        },
        options: {
          transform: ['babelify', 'debowerify']
        }
      }
    },
    bower_concat: {
      all: {
        dependencies: {
          'jquery-ui': 'jquery'
        },
        // exclude: [
        //   'mdDataTable'
        // ],
        dest: 'public/build/vendors/_bower.js',
        cssDest: 'public/build/vendors/_bower.css'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      min: {
        files: {
          'public/build/min/vendors.min.js': ['public/build/vendors/*.js'],
          // 'public/build/min/scripts.min.js': ['public/js/*.js']
        }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-bower-concat');
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
    }, 1000);
  });

  grunt.registerTask('default', ['babel', 'less', 'sync', 'bower_concat', 'browserify', 'uglify', 'develop', 'watch']);
  // grunt.registerTask('default', ['babel', 'less', 'sync', 'bower_concat', 'browserify', 'develop', 'watch']);
};
