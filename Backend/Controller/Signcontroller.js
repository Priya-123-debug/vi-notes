import mongoose from "mongoose";
// FIX THIS FILE
import User from "../Model/user.js";

import bcrypt from "bcrypt";

export const Signcontroller = async (req, res) => {
  // client → /sign → Signcontroller
  //       ↓
  //  Validate data
  //       ↓
  //  Check user exists
  //       ↓
  //  Hash password
  //       ↓
  //  Save user
  //       ↓
  //  Send response
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("something is missing");
      return res.status(400).json("error something is missing");
    }
    const user = await User.findOne({ email });
    if (user) {
      console.log("user is already present");
      return res.status(400).json({
        message: "Something is missing",
      });
    } else {
      const hashp = await bcrypt.hash(password, 10);
      const newuser = new User({
        name: name,
        email: email.toLowerCase(),
        password: hashp,
      });
      await newuser.save();
      return res.status(201).json({
        message: "user created successfully",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "server error happen",
    });
  }
};
