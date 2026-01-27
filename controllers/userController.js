import dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../Middlewares/mail.js";

export const signup = async (req, res) => {
  const data = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const NewUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    },
  });
  return res.status(200).json({ message: "User created successfully" });
};

export const login = async (req, res) => {
  const data = req.body;
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 10,
  })


  return res
    .status(200)
    .json({ accessToken: accessToken, message: "Login successful" });
};

export const forgotPassword = async (req, res) => {
  const data = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const resetToken = jwt.sign({ id: user.id }, process.env.HASH_SECRET, {
    expiresIn: "10h",
  });

//   await sendResetPasswordEmail(user.email, resetToken);

  return res
    .status(200)
    .json({ message: "Reset token sent to email", resetToken: resetToken });
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    // verify the token
    const decoded = jwt.verify(token, process.env.HASH_SECRET)
    if (!decoded) {
        return res.status(400).json({ message: "Invalid token" });
    }
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
        where: {id: user.id},
        data: {password: hashedPassword}
    })
    res.status(200).json({ message: "Password reset successfully" });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
};
