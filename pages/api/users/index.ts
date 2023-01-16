import type { NextApiRequest, NextApiResponse } from "next";

export interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  tokenExpires: Date;
}
export const users: User[] = [];

type Data = {
  message: string;
  body: null | User[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Success", body: users });
  } else {
    res.status(406).json({ message: "Wrong method", body: null });
  }
}
