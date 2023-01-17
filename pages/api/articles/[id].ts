import { cors, DefaultData, runMiddleware } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { articles } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultData>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ message: "Id required", body: null });
    const filteredArticle = articles.filter((item) => item.id === Number(id));

    return res.status(200).json({
      message: "Success",
      body: filteredArticle.length === 0 ? null : filteredArticle[0],
    });
  }
  return res.status(406).json({ message: "Wrong method", body: null });
}
