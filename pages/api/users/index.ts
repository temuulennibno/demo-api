import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

export interface User {
  id: string;
  email: string;
  password: string;
  token: string;
  tokenExpires: Date;
}
export const users: User[] = [
  {
    id: nanoid(),
    email: "aculani1@mail.mn",
    password: "@Aa12345",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "doodoo1234@doo.mn",
    password: "Doodoo@123",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "tost1234@gmail.com",
    password: "Test@1234",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "tem@tem.com",
    password: "!Aa12345",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "test@test.mn",
    password: "123456Aa@",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "Bek12345@gmail.com",
    password: "Bek12345.",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "dorj@dorj.mn",
    password: "Test@1234",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "daa111@daa.mn",
    password: "Boldoo@123",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "Akre0123@gmail.com",
    password: "Akre0123.",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "test9@test.com",
    password: "Test123!",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "aa@gg.com",
    password: "!Aa12345",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "nomuuk@gmail.com",
    password: "Test@1234",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "numuuk@gmail.com",
    password: "Test@1234",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "bataa1234@bat.mn",
    password: "Bataa@123",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    id: nanoid(),
    email: "test1@test.com",
    password: "Test123!",
    token: nanoid(),
    tokenExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
];

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
