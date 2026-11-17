const express = require("express");
const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const reqLogger = require("./middleware/reqLogger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(reqLogger);
app.use(cookieParser());

// Routes
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
