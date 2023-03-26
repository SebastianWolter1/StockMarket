import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

const register = async (req, res) => {
  const { name, email, password, role, stocks } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      error: "User already exists",
    });
  }
  try {
    const user = new User({
      name,
      email,
      password,
      role,
      stocks
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    console.log(userExists)
    if (!userExists) {
      return res.status(400).json({ msg: "user not found" });
    }
    const isMatch = await userExists.comparePassword(
      password,
      userExists.password
      );
      console.log(password, userExists.password)
      console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ msg: "password not correct" });
    }
    const payload = {userId : userExists._id}
    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign(payload, secretKey, {expiresIn: "11h"});
    
    res.cookie("token", token, {httpOnly: true, maxAge : 3600000}) 

    res.json({msg: "login success", role: userExists.role, stocks: userExists.stocks, token: token})
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" });
  }
};


const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token")
    res.json({msg: "logout success"})
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" });
  }
}


export { register, getUsers, loginUser, logoutUser};
