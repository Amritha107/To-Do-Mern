const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({
    userId: req.user.id,
  });

  res.json(tasks);
});

router.post("/", authMiddleware, async (req, res) => {
  const task = await Task.create({
    userId: req.user.id,

    title: req.body.title,

    priority: req.body.priority,

    dueDate: req.body.dueDate,
  });

  res.json(task);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.completed = !task.completed;

  await task.save();

  res.json(task);
});

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted",
    });
  }
);

module.exports = router;