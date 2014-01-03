var mongoose = require('mongoose')
var Yongoose = require('..');

new Yongoose(mongoose)
  .connect('mongodb://localhost/test')
  .includeDir(__dirname + '/models')
  .start()
