const router = require("express").Router();
const { Todo, User } = require("../models");

// GET all todos
router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      include: {
        model: User,
        attributes: ["id", "name", "username"],
      },
    });
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

// GET todo by ID
router.get("/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id, {
      include: {
        attributes: ["id", "name", "username"],
      },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

// POST create todo
router.post("/", async (req, res, next) => {
  try {
    const { task, done, userId } = req.body;
    const todo = await Todo.create({ task, done, userId });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

// PATCH update todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const { task, done } = req.body;
    await todo.update({ task, done });

    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE todo
router.delete("/:id", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (todo.userId != userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await todo.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
