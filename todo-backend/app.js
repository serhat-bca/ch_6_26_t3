const express = require("express");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const reqLogger = require("./middleware/reqLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(reqLogger);

// Routes
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
