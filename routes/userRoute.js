const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

//signup
userRoute.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      res.status(200).send({ msg: "User Already Existed !" });
    } else {
      bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err });
        } else {
          const user = new UserModel({
            email,
            password: hash,
            confirmPassword: hash,
          });
          await user.save();
          console.log(user);
          res
            .status(200)
            .send({ msg: "User has been registered successfully" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//login
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await UserModel.findOne({ email: email });
    if (!checkUser) {
      res.status(200).send({ msg: "User Not Found !" });
    } else {
        bcrypt.compare(password, checkUser?.password, async(err, result)=>{
            if(!result){
                res.status(200).send({ msg: "Wrong Password !" });
            }else{
                const token = jwt.sign({userID: checkUser?._id}, "shatru47");
                res.status(200).send({ token: token });
            }
        })
    }
  } catch (error) {
    res.status(400).send({"error": error})
  }
});

module.exports = {
  userRoute,
};
