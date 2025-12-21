const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE TASK
router.post("/", auth, async (req, res) => {

  //! auth middleware ensures only authenticated users can create tasks

  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user              //! Links the task to the logged-in user
    });
    
    res.json(task);
  } 
  catch (e) {
    res.status(500).json({ msg: "Error creating task" });
  }
});

// GET TASKS (with filters + search)
//! GET/Fetches ALLTASK BY User ID  --> This is for fetching all tasks for the authenticated user with optional filters As well as search.
router.get("/", auth, async (req, res) => {
  try {
    const { status, search } = req.query;

    const query = { userId: req.user };

    if (status) query.status = status;
    if (search) {
      //! Search uses mongo db regex for case insensitive search in title
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query);
    
    // ! Sends the task list to the frontend
    res.json(tasks);
  } 

  catch (e) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }

});

// // GET SINGLE TASK BY User ID  --> This is for fetching a single task by its ID for the authenticated user Most Important hai
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (e) {
    res.status(500).json({ msg: "Error getting task" });
  }
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );

    res.json(updated);
  } 
  catch (e) {
    res.status(500).json({ msg: "Update error" });
  }
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    res.json({ msg: "Task removed" });
  } 
  catch (e) {
    res.status(500).json({ msg: "Delete error" });
  }
});

module.exports = router;
