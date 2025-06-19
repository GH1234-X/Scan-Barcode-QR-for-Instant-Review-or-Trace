// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// let adminUsers = [
//   {
//     username: "arman",
//     passwordHash: bcrypt.hashSync("arman@2006", 10),
//   },
// ];

// export const login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = adminUsers.find(u => u.username === username);

//   if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.passwordHash);
//   if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//   const token = jwt.sign({ username }, "secretkey", { expiresIn: "2h" });
//   res.json({ token, username });
// };

// export const register = async (req, res) => {
//   const { username, password } = req.body;
//   const existing = adminUsers.find(u => u.username === username);

//   if (existing) return res.status(400).json({ message: "User already exists" });

//   const passwordHash = await bcrypt.hash(password, 10);
//   adminUsers.push({ username, passwordHash });

//   res.status(201).json({ message: "Registered successfully" });
// };



import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET = "secretkey"; // move to .env in production

// REGISTER
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.userId,
      username: newUser.username,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: user.username, userId: user.userId },
      SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
