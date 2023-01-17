import { cors, DefaultData, lorem, runMiddleware } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/utils/auth";

export let categories = [
  {
    id: 0,
    name: "Технологи",
    description: lorem.generateSentences(2),
  },
  {
    id: 1,
    name: "Цаг үе",
    description: lorem.generateSentences(2),
  },
  {
    id: 2,
    name: "Түүх",
    description: lorem.generateSentences(2),
  },
  {
    id: 3,
    name: "Соёл",
    description: lorem.generateSentences(2),
  },
];

let nextId = categories.length;

const DELETE = (req: NextApiRequest, res: NextApiResponse<DefaultData>) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Id required", body: null });
  categories = categories.filter((item) => item !== id);
  return res.status(200).json({ message: "Success", body: id });
};

const UPDATE = (req: NextApiRequest, res: NextApiResponse<DefaultData>) => {
  const { id, name, description } = req.body;
  let updatedCategory;
  if (!id) return res.status(400).json({ message: "Id required", body: null });
  categories = categories.map((item) => {
    if (id !== item.id) return item;
    updatedCategory = item;
    if (name) {
      updatedCategory.name = name;
    }
    if (description) {
      updatedCategory.description = description;
    }
    return updatedCategory;
  });
  return res.status(200).json({ message: "Success", body: updatedCategory });
};

const CREATE = (req: NextApiRequest, res: NextApiResponse<DefaultData>) => {
  const { name, description } = req.body;
  let newCategory = { id: nextId, name, description };
  categories = [...categories, newCategory];
  nextId++;
  return res.status(200).json({ message: "Success", body: newCategory });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultData>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET")
    return res.status(200).json({ message: "Success", body: categories });

  const authInfo = auth(req, res);
  if (!authInfo.isAuth) return authInfo.res;

  if (req.method === "PATCH") return UPDATE(req, res);

  if (req.method === "DELETE") return DELETE(req, res);

  if (req.method === "POST") return CREATE(req, res);
}
