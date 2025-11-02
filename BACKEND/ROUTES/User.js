const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const { userModel } = require("../DB/db");
const zod = require("zod");

const UserRouter = Router();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "user_secret_key";

// SIGNUP
UserRouter.post("/signup", async (req, res) => {
  const schema = zod.object({
    fullName: zod.string().min(3),
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect Data Format",
      error: parsed.error,
    });
  }

  const { fullName, email, password } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role: "user",
    });
    return res.json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// SIGNIN
UserRouter.post("/signin", async (req, res) => {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid data format",
      error: parsed.error,
    });
  }

  const { email, password } = parsed.data;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(403).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_USER_SECRET, {
      expiresIn: "2h",
    });

    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { UserRouter };
