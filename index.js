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
    require(path.resolve(model_path));
    return this;
  },
  this.includeDir = function(dir_path) {
    var self = this;
    dir_path = path.resolve(dir_path);
    var files = fs.readdirSync(dir_path);
    files.forEach(function(file){
      self.include(dir_path + '/' + file);
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
  var program = require('commander');
  program
    .version('0.0.1')
    .option('-i, --include [model]', 'Include models')
    .option('-d, --dir [model directory]', 'Include model directory')
    .parse(process.argv);
  var yongoose = new CoYongoose().connect(program.args[0])
  if (program.include) {
    yongoose.include(program.include)
  }
  if (program.dir) {
    yongoose.includeDir(program.dir)
  }
  yongoose.start();
} else {
  module.exports = CoYongoose
}
