import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminUser = {
  username: "vinay",
  passwordHash: bcrypt.hashSync("vinay@2006", 10),
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, adminUser.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: adminUser.username }, "secretkey", {
    expiresIn: "2h",
  });

  res.json({ token });
};
