const express = require("express");
const todosRouter = require("./routes/todos");
const reqLogger = require("./middleware/reqLogger");

const app = express();

// Middleware
app.use(express.json());
app.use(reqLogger);

// Routes
app.use("/api/todos", todosRouter);

module.exports = app;
