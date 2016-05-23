'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const runSequence = require('run-sequence');
const swPrecache = require('sw-precache/lib/sw-precache.js');

gulp.task('clean', () => {
  return del(['elements/vulcanized.elements.html']);
});

gulp.task('vulcanize', ['clean'], () => {
  return gulp.src('elements/elements.html')
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss:     true,
      inilneScripts: true
    }))
    .pipe($.rename({prefix: 'vulcanized.'}))
    .pipe(gulp.dest('elements/'));
});

gulp.task('generate-service-worker', cb => {
  swPrecache.write('sw.js', {
    runtimeCaching: [{
      urlPattern: /fonts\.googleapis\.com/,
      handler: 'cacheFirst'
    }],
    staticFileGlobs: [
      'assets/**/*.@(js|css|jpg|png|gif|eot|svg|ttf|woff|otf)',
      'elements/**/*.*',
      'images/cover.jpg',
      'images/avatar.jpg'
    ]
  }, cb);
});

gulp.task('build', () => {
  runSequence(
    'vulcanize',
    'generate-service-worker'
  );
});
