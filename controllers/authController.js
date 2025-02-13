import userModel from "../models/userModel";
import bcrypt from "bcryptjs";

async function register(req, res) {
  try {
    const { email, password } = req.body;

    // Kiem tra du lieu hop le: joi, express-validator
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is Required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password min 6 character" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User existed" });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // them user
    const newUser = {
      email,
      password: hashedPassword,
    };

    const userCreated = await userModel.create(newUser);

    res.json(userCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register };
