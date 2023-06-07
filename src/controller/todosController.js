const {
  createTodo,
  findUserTodo,
  updateTodo,
  findTodo,
  deleteTodo,
  setCompleted
} = require("../model/todosModel");

const TodosController = {
  insertTodo: async (req, res, next) => {
    try {
      let user_id = req.payload.id;
      let { title, description } = req.body;
      let data = {
        user_id,
        title,
        description,
      };
      if (!title)
        return res
          .status(400)
          .json({ status: 400, message: `Todo Title missing` });
      const result = await createTodo(data);
      if (!result) {
        return res.status(401).json({ msg: "Failed insert todos" });
      }
      return res
        .status(201)
        .json({ msg: "Inserted todos successfully", data: data });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  getTodo: async (req, res, next) => {
    try {
      let user_id = req.payload.id;
      const result = await findUserTodo(user_id);
      if (result.rows.length === 0) {
        return res
          .status(400)
          .json({ msg: `Failed getting todo of user ${user_id}` });
      }
      return res
        .status(200)
        .json({
          msg: `Success get todo of user ${user_id}`,
          data: result.rows,
        });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  updateTodo: async (req, res, next) => {
    try {
      let id = req.params.id;
      let {
        rows: [todo],
      } = await findTodo(id);
      let user_id = req.payload.id;
      let data = {
        id,
        user_id,
        title: req.body.title || todo.title,
        description: req.body.description || todo.description,
      };
      const result = await updateTodo(data);
      if (!result) {
        return res.status(401).json({ msg: "Failed update todos" });
      }
      return res
        .status(201)
        .json({ msg: "updated todos successfully", data: data });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  setCompleted: async (req, res, next) => {
    try {
      let id = req.params.id;
      let user_id = req.payload.id;
      let data = {
        id,
        user_id,
      };
      const result = await setCompleted(data);
      if (!result) {
        return res.status(401).json({ msg: "Failed update todo status" });
      }
      return res
        .status(201)
        .json({ msg: "updated todo status successfully", data: data });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  deleteTodo: async (req, res, next) => {
    try {
      let id = req.params.id;
      let {
        rows: [todo],
      } = await findTodo(id);
      if (!todo) {
        return res.status(401).json({ msg: "Todo not found" });
      }
      let user_id = req.payload.id;
      let data = {
        id,
        user_id,
      };
      const result = await deleteTodo(data);
      if (!result) {
        return res.status(401).json({ msg: "Failed delete todos" });
      }
      return res.status(201).json({ msg: `deleted todo ${id} successfully` });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = TodosController;
