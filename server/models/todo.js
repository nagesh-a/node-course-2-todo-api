var mongoose = require("mongoose");
var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlenght: 1,
    trim: true // trims off leading and trailing whitespaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports={
  Todo
}
