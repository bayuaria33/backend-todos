const express = require("express");
const router = express.Router();
const {
  insertTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todosController");
const { protect } = require("../middleware/auth");

router.get("/my-todo", protect, getTodo);
router.post("/add/", protect, insertTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;
