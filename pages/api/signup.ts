import type { NextApiRequest, NextApiResponse } from "next";
import { User, users } from "./users";
import { nanoid } from "nanoid";
import { cors, runMiddleware } from "@/utils/utils";

type Data = {
  message: string;
  body: null | User;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&.])(?=.*\d)[a-zA-Z@$!%*#?&.\d]{8,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    let usersIndex = users.length;
    const { email, password, repassword } = req.body;
    if (password !== repassword) {
      res.status(400).json({ message: "Password doesn't match", body: null });
    } else {
      if (passwordRegex.test(password)) {
        if (emailRegex.test(email)) {
          const emailIndex = users.findIndex((user) => user.email === email);
          if (emailIndex === -1) {
            const user = {
              id: usersIndex,
              email,
              password,
              token: nanoid(),
              tokenExpires: new Date(Date.now() + 1000 * 60 * 10),
            };
            users[usersIndex] = user;
            usersIndex++;
            res.send({ message: "Signup success", body: user });
          } else {
            res
              .status(400)
              .send({ message: "Email already exists", body: null });
          }
        } else {
          res.status(400).json({ message: "Email invalid", body: null });
        }
      } else {
        res
          .status(400)
          .json({ message: "Password requirement invalid", body: null });
      }
    }
  } else {
    res.status(406).json({ message: "Wrong method", body: null });
  }
}
