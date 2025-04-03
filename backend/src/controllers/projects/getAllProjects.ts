import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    res.status(200).json({
      projects,
    });
  } catch (err) {
    console.log("Error", err);
  }
};

export default getAllProjects;
