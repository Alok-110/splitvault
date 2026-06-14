import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const register = async (name: string, email: string, password: string) => {

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new Error("User already exists")
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password:hash } });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return {token, user};
};

const login = async (email: string, password: string) => {

    const user = await prisma.user.findUnique({where: { email }});
    if(!user)
      throw new Error("User does not exist. Please register first");

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error("Invalid password")

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    return { token, user };
}

export { register, login }
