const mongoose = require("mongoose");

// User Tasks Schema Definition:
const TaskSchema = new mongoose.Schema({
  
  title: { type: String, required: true },
  
  description: String,
  
  dueDate: Date,

  priority: {
    type: String,
    enum: ["low", "medium", "high"],      // DropBox values for selecting priority
    default: "low"                        // default low priority is selected
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do"
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

});

module.exports = mongoose.model("Task", TaskSchema);
