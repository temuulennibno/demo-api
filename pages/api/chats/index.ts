import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { cors, DefaultData, runMiddleware } from "@/utils/utils";
import { nanoid } from "nanoid";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface Chat {
  id: string;
  name: string;
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultData>
) {
  runMiddleware(req, res, cors);
  const chats: Chat[] = JSON.parse(
    fs.readFileSync("./pages/api/chats/chats.json", "utf-8")
  );
  if (req.method === "GET") {
    return res.status(200).json({ message: "Success", body: chats });
  }
  if (req.method === "POST") {
    const { name, text } = req.body;
    if (!text)
      return res.status(400).json({ message: "Text required", body: null });
    const chat = { id: nanoid(), name: name ?? "Зочин", text };
    chats.push(chat);
    fs.writeFileSync("./pages/api/chats/chats.json", JSON.stringify(chats));
    return res.status(200).json({ message: "Success", body: chat });
  }
  return res.status(406).json({ message: "Unsupported method!", body: null });
}
