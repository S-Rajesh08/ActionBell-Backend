const mongoose = require("mongoose");
const userscheme = new mongoose.Schema({
  name: String,
  mail: String,
  pass: String,
  reminders: [
    {
      title: String,
      des: String,
      date: Date,
      time: Date,
      options: {
        before12: Boolean,
        before6: Boolean,
        before4: Boolean,
        before2: Boolean,
        before1: Boolean,
        before30: Boolean,
      },
    },
  ],
  list: [
    {
      title: String,
      lists: String,
    },
  ],
});

module.exports = mongoose.model("User", userscheme);
