const express = require("express");
const router = express.Router();
const {
  insertTodo,
  getTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  setCompleted
} = require("../controller/todosController");
const { protect } = require("../middleware/auth");

router.get("/my-todo", protect, getTodo);
router.get("/:id", getTodoById);
router.post("/add/", protect, insertTodo);
router.put("/complete/:id", protect, setCompleted)
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;
