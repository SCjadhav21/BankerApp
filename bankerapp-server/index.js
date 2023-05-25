let express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
let app = express();

app.use(express.json());

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DataBase`);
  } catch (err) {
    console.log("Error: cant connect to mongodb");
  }
  console.log(`running on port ${process.env.port}`);
});
