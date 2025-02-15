import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    const { email, password } = req.body;
    //Kiem tra du lieu hop le
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is Required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password min 6 character" });
    }
    // Kiểm tra xem email đã tồn tại chưa
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email existed" });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // them user
    const newUser = {
      email,
      password: hashedPassword,
    };
    const userCreated = await userModel.create(newUser);

    // remove password response
    res.json({ ...userCreated.toObject(), password: undefined });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register };
