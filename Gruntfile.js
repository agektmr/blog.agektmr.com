'use strict';
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var fs = require('fs');
  var packageJson = require('./package.json');
  var path = require('path');
  var swPrecache = require('./node_modules/sw-precache/lib/sw-precache.js');

  function generateServiceWorkerFileContents(rootDir, handleFetch, callback) {
    var config = {
      cacheId: packageJson.name,
      dynamicUrlToDependencies: {},
      // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
      // the service worker will precache resources but won't actually serve them.
      // This allows you to test precaching behavior without worry about the cache preventing your
      // local changes from being picked up during the development cycle.
      handleFetch: handleFetch,
      logger: grunt.log.writeln,
      staticFileGlobs: [
        rootDir + '/assets/fonts/**.*',
        rootDir + '/images/**/*.*'
      ],
      stripPrefix: path.join(rootDir, path.sep)
    };

    swPrecache(config, callback);
  };

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        'assets/js/plugins/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint','uglify']
      }
    },
    clean: {
      dist: [
        'assets/js/scripts.min.js'
      ]
    },
    vulcanize: {
      default: {
        options: {
          strip: true
        },
        files: {
          'vulcanized.html': 'elements.html'
        }
      }
    },
    swPrecache: {
      default: {
        handleFetch: false,
        rootDir: '.'
      }
    }
  });

  grunt.registerMultiTask('swPrecache', function() {
    var done = this.async();
    var rootDir = this.data.rootDir;
    var handleFetch = this.data.rootDir;

    generateServiceWorkerFileContents(rootDir, handleFetch, function(error, serviceWorkerFileContents) {
      if (error) {
        grunt.fail.warn(error);
      }
      fs.writeFile(path.join(rootDir, 'sw.js'), serviceWorkerFileContents, function(error) {
        if (error) {
          grunt.fail.warn(error);
        }
        done();
      });
    });
  });

  // Load tasks
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-svgmin');
  // grunt.loadNpmTasks('grunt-vulcanize');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'vulcanize',
    'uglify',
    'imagemin',
    'svgmin',
    'swPrecache'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
