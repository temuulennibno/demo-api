import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { cors, runMiddleware } from "@/utils/utils";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface Chat {
  id: string;
  name: string;
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("X-Accel-Buffering", "no");

    runMiddleware(req, res, cors);

    let prevId;
    for (let i = 0; i < 1000; i++) {
      const chats: Chat[] = JSON.parse(
        fs.readFileSync("./pages/api/chats/chats.json", "utf-8")
      );

      const lastChat = chats[chats.length - 1];

      if (prevId !== lastChat.id) {
        res.write("data: " + JSON.stringify(lastChat));
        prevId = lastChat.id;
      } else {
        res.write("ping");
      }
    }

    res.end("done");
  } else {
    res.status(406).json("Unsupported method!");
  }
}
