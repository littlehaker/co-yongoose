#!/usr/bin/env node --harmony

var REPL = require('co-repl');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path')
require('mongoose-q')(mongoose)

function CoYongoose() {
  this.mongoose = mongoose;
  this.connect = function(conn_str) {
    this.mongoose.connect(conn_str || 'mongodb://localhost/test');
    return this;
  },
  this.include = function(model_path) {
    require(model_path);
    return this;
  },
  this.includeDir = function(dir_path) {
    dir_path = path.resolve(dir_path);
    var files = fs.readdirSync(dir_path);
    files.forEach(function(file){
      require(dir_path + '/' + file);
    });
    return this;
  },
  this.start = function() {
    var self = this;
    var repl = REPL.start();
    Object.keys(this.mongoose.models).forEach(function(key) {
      repl.context[key] = self.mongoose.models[key];
      console.log('Model loaded: ', key);
    });
    repl.displayPrompt();
    return this;
  }
}

if (!module.parent) {
  new CoYongoose().connect().start();
} else {
  module.exports = CoYongoose
}
