const { model, Schema } = require("mongoose");

let AI = new Schema({
  Guild: String,
  Channel: String,
  chatbot: String,
});

module.exports = model("AI", AI);
