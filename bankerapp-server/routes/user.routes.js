const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const app = express();
app.use(express.json());

const UserRoutes = express.Router();

UserRoutes.post("/register", async (req, res) => {
  let { name, email, mobile, password, address } = req.body;
  try {
    const users = await UserModel.find({ email });
    if (users.length > 0) {
      res.status(200).send("email is already exist try with new email");
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send(err);
        } else {
          const user = new UserModel({
            name,
            email,
            password: hash,
          });
          await user.save();
          res.status(201).send("user Registered successfully");
        }
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

UserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(400).send(err);
        } else if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.key);
          res.status(200).send({
            msg: "Login Successfull",
            name: user.name,
            token: token,
          });
        } else {
          res.status(401).send("Wrong Credntials");
        }
      });
    } else {
      res.status(401).send("Wrong Credntials");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = { UserRoutes };
