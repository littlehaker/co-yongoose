var Yongoose = require('..');

new Yongoose()
  .connect('mongodb://localhost/test')
  .includeDir(__dirname + '/models')
  .start()
