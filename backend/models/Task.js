const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  title: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  priority: {
    type: String,
    default: "Medium",
  },

  dueDate: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Task",
  taskSchema
);