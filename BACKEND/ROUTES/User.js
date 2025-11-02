const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const { userModel } = require("../DB/db");
const zod = require("zod");
const config = require("../config");

const UserRouter = Router();
const JWT_USER_SECRET = config.JWT_USER_SECRET || "user_secret_key";

UserRouter.post("/signup", async (req, res) => {
  const schema = zod.object({
    fullName: zod.string().min(3, "Name must be at least 3 characters long"),
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(4, "Password must be at least 4 characters long"),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      errors: parsed.error.errors,
    });
  }

  const { fullName, email, password } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


UserRouter.post("/signin", async (req, res) => {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid data format",
      errors: parsed.error.errors,
    });
  }

  const { email, password } = parsed.data;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_USER_SECRET, {
      expiresIn: "2h",
    });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signin Error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { UserRouter };
