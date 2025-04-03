import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);

    if (isNaN(projectId)) {
      res.status(400).json({ error: "Invalid project ID" });
      return;
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    res.status(200).json({
      message: "Project Deleted Successfully",
      id: projectId,
      name: project.name,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Could not delete project" });
  }
};

export default deleteProject;
