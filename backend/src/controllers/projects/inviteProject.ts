import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const inviteProject = async (req: Request, res: Response) => {
  const {} = req.body;
};

export default inviteProject;
