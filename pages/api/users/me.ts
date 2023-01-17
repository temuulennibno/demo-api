import { cors, runMiddleware } from "@/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { User, users } from "./index";

type Data = {
  message: string;
  body: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(400).json({ message: "Auth token not found", body: null });
    } else {
      const filteredUsers = users.filter(
        (user: User) => user.token === authorization
      );
      let user: User;
      if (filteredUsers.length > 0) {
        user = filteredUsers[0];
        if (new Date().getTime() - user.tokenExpires.getTime() > 0) {
          res.status(403).json({ message: "Not authorized", body: null });
        } else {
          res.status(200).json({ message: "success", body: user });
        }
      } else {
        res.status(400).json({ message: "User not found", body: null });
      }
    }
  } else {
    res.status(406).json({ message: "Wrong method", body: null });
  }
}
