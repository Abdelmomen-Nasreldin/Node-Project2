const mongoose = require("mongoose");

const book = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: { type: String, required: true },
  dateOfPuplish: { type: Date, required: true },
  description: { type: String},
  puplisherName: { type: String },
  userId : { type: String, required: true}
},
{timestamps : true});

module.exports = mongoose.model("book", book)