const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Resource Already Exists",
    });
  }
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      errors: error.errors.map((e) => e.message),
    });
  }
  if (error.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({ error: "Invalid Foreign Key" });
  }
  console.log("Error during User creation: ", error);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
