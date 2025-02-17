import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    console.log({ token });
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied! No token provided." });
    }
    const decoded = jwt.verify(token, "hoadv21");

    console.log({ decoded });

    const user = await userModel.findById(decoded.id);

    console.log({ user });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { authMiddleware };
