let express = require("express");
const { connection } = require("./config/db");
const { UserRoutes } = require("./routes/user.routes");
const cors = require("cors");
require("dotenv").config();

let app = express();
app.use(cors());
app.use(express.json());

app.use("/user", UserRoutes, (req, res) => {
  res.status(404).send("Routes not found");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DataBase`);
  } catch (err) {
    console.log("Error: cant connect to mongodb" + err);
  }

  console.log(`running on port ${process.env.port}`);
});
