module.exports = resolve;

var Promise = require('es6-promise').Promise; // jshint ignore:line
var debug = require('debug')('inliner');
var SVGO = require('svgo');
var svgo = new SVGO({ full: true });

function resolve(inliner, todo, $) {
  debug('start %s svg', todo.length, !!$);
  return todo.map(function (svg) {
    return new Promise(function (resolve) {
      var $svg = $(svg);
      var source = $svg.html();

      debug('optimising svg');

      svgo.optimize(source, function (result) {
        if (result.error) {
          // debug('svg failed', result.error);
          return;
        }
        debug('optimised again');

        $svg.text(result.data);
      });

      resolve();
    });

  });
}