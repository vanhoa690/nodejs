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

    // them user
    const newUser = {
      email,
      password,
    };
    const userCreated = await userModel.create(newUser);
    res.json(userCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register };
