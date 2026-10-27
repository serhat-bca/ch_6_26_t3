require("dotenv").config();

const app = require("./app");
const sequelizeDB = require("./util/db");

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await sequelizeDB.authenticate();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exitCode = 1;
  }
};

start();
