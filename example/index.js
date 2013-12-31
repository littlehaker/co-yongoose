var Yongoose = require('..');

new Yongoose()
  .connect('mongodb://localhost/test')
  .includeDir('./models')
  .start()
