const express = require("express");
const router = express.Router();
const UsersRoute = require("../routes/usersRoute");
const TodosRoute = require("../routes/todosRoute")
router.use("/users", UsersRoute);
router.use("/todos", TodosRoute);
module.exports = router;
