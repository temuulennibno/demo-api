import { cors, DefaultData, lorem, runMiddleware } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/utils/auth";
import { nanoid } from "nanoid";

export let articles = [
  {
    id: nanoid(),
    imageUrl: "https://loremflickr.com/640/360",
    categoryId: 0,
    name: lorem.generateSentences(1),
    description: lorem.generateSentences(2),
    text: lorem.generateParagraphs(10),
  },
  {
    id: nanoid(),
    imageUrl: "https://loremflickr.com/1080/720",
    categoryId: 0,
    name: lorem.generateSentences(1),
    description: lorem.generateSentences(2),
    text: lorem.generateParagraphs(10),
  },
  {
    id: nanoid(),
    imageUrl: "https://loremflickr.com/1080/1080",
    categoryId: 1,
    name: lorem.generateSentences(1),
    description: lorem.generateSentences(2),
    text: lorem.generateParagraphs(10),
  },
  {
    id: nanoid(),
    imageUrl: "https://loremflickr.com/720/1080",
    categoryId: 2,
    name: lorem.generateSentences(1),
    description: lorem.generateSentences(2),
    text: lorem.generateParagraphs(10),
  },
];

let nextId = articles.length;

const DELETE = (req: NextApiRequest, res: NextApiResponse<DefaultData>) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Id required", body: null });
  articles = articles.filter((item) => item.id !== id);
  return res.status(200).json({ message: "Success", body: id });
};

const UPDATE = (req: NextApiRequest, res: NextApiResponse<DefaultData>) => {
  const { id, name, description } = req.body;
  let updatedArticle;
  if (!id) return res.status(400).json({ message: "Id required", body: null });
  articles = articles.map((item) => {
    if (id !== item.id) return item;
    updatedArticle = item;
    if (name) {
      updatedArticle.name = name;
    }
    if (description) {
      updatedArticle.description = description;
    }
    return updatedArticle;
  });
  return res.status(200).json({ message: "Success", body: updatedArticle });
};

const CREATE = (req: NextApiRequest, res: NextApiResponse<DefaultData>) => {
  const { name, description, text, imageUrl, categoryId } = req.body;
  let newArticle = {
    id: nanoid(),
    name,
    description,
    text,
    imageUrl,
    categoryId,
  };
  articles = [...articles, newArticle];
  return res.status(200).json({ message: "Success", body: newArticle });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultData>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET")
    return res.status(200).json({ message: "Success", body: articles });

  const authInfo = auth(req, res);

  if (!authInfo.isAuth) return authInfo.res;

  if (req.method === "PATCH") return UPDATE(req, res);

  if (req.method === "DELETE") return DELETE(req, res);

  if (req.method === "POST") return CREATE(req, res);
}
