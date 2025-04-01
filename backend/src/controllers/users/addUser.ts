import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  // Check if user exists
  if (existingUser) {
    res.status(400).json("Email already in use!");
  }

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  // Get Users Table
  const users = await prisma.user.findMany();
  console.table(users);

  res.status(201).json({
    message: "User created!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

export default addUser;
