import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "./users";
import { nanoid } from "nanoid";

type Data = {
  message: string;
  body: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const index = users.findIndex(
      (user) => user.email === email && user.password === password
    );
    if (index === -1) {
      res.status(400);
      res.json({ message: "Email and password doesn't match", body: null });
    } else {
      const token = nanoid();
      users[index].tokenExpires = new Date(Date.now() + 1000 * 60 * 10);
      users[index].token = token;
      res.status(200);
      res.json({ message: "Success", body: token });
    }
  } else {
    res.status(406).json({ message: "Wrong method", body: null });
  }
}
