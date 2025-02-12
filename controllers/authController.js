import userModel from "../models/userModel";
import bcrypt from "bcryptjs";

async function register(req, res) {
  try {
    const { email, password } = req.body;

    // Kiem tra du lieu hop le
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password min 6 character" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // them user
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
    const userCreated = await userModel.create(newUser);

    res.status(201).json(userCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register };
