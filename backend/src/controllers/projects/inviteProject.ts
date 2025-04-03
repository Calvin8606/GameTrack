import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const inviteToProject = async (req: Request, res: Response) => {
  const {} = req.body;
};

export default inviteToProject;
