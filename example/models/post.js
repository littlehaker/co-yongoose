var mongoose = require("mongoose");

var schema = mongoose.Schema({
  title: String
});

module.exports = mongoose.model("Post", schema);
