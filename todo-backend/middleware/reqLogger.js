const reqLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.path}`);
  const body = req.body?.password
    ? { ...req.body, password: "**********" }
    : req.body;
  console.log("Request Body:", body);
  console.log("--------------------------------");

  next();
};

module.exports = reqLogger;
