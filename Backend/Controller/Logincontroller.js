import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../Model/user.js";

export const Logincontroller = async (req, res) => {
  // 	Client

  //          POST /login
  //          { email, password }

  // Server

  // Logincontroller
  //
  //          Validate input
  //          Find user (DB)
  //          Compare password (bcrypt)
  //          Generate token (JWT)

  // Response → { token }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("something is missing");
      return res.status(400).json({
        message: "something is missing",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        console.log("user is missing");
        return res.status(400).json({
          message: "user  not find",
        });
      } else {
        const matchpassword = await bcrypt.compare(password, user.password);
        if (!matchpassword) {
          return res.status(400).json({
            message: "password is not matching",
          });
        }
        const token = jwt.sign({ userId: user._id }, process.env.seceret_key, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          message: "login successfully",
          token,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};
