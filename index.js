/* jshint node: true */
'use strict';

var SassLinter = require('broccoli-sass-lint');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'sass-styleguide',

  included: function(app) {
    if (!app.isTestingSassLintAddon) {
      this._super.included(app);
    }

    this.app = app;
    this.sassLintOptions = app.options.sassLint || {
      configPath: 'node_modules/sass-styleguide/blueprints/sass-styleguide/files/.sass-lint.yml'
    };
  },

  lintTree: function(type, tree) {
    var formattedResults, mergedTrees, results;

    if (type === 'tests') {
      mergedTrees = mergeTrees([this.app.trees.styles]);

      return new SassLinter(mergedTrees, this.sassLintOptions);
    } else {
      return tree;
    }
  }
};
