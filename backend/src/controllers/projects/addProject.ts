import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const addProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = (req as any).user;

    // Project must have name
    if (!name) {
      res.status(400).json({ error: "Project name is required" });
      return;
    }

    // Create Project
    const project = await prisma.project.create({
      data: {
        name,
        owner: {
          connect: { id: user.id },
        },
        members: {
          create: {
            userId: user.id,
            role: "OWNER",
          },
        },
      },
      include: {
        members: true,
      },
    });
    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default addProject;
