// pages/api/tasks/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    return res.status(200).json(task);
  }

  if (req.method === "PUT") {
    const { title, completed } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, completed },
    });
    return res.status(200).json(task);
  }

  if (req.method === "DELETE") {
    await prisma.task.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
