import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProjectById = async (req: Request, res: Response) => {
  const projectId = parseInt(req.params.id);
  const user = (req as any).user;
  const userId = user.id;

  try {
    const findProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    if (!findProject) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    res.json({ project: findProject });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default getProjectById;
