// pages/api/tasks/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const tasks = await prisma.task.findMany();
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title } = req.body;
    const task = await prisma.task.create({ data: { title } });
    return res.status(201).json(task);
  }

  if (req.method === "PUT") {
    const { id, title, completed } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, completed },
    });
    return res.status(200).json(updatedTask);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.task.delete({ where: { id } });
    return res.status(204).end(); // No content to send back
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
