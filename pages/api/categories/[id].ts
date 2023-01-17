import { cors, DefaultData, runMiddleware } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { categories } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DefaultData>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ message: "Id required", body: null });
    const filteredCat = categories.filter((item) => item.id === Number(id));

    return res.status(200).json({
      message: "Success",
      body: filteredCat.length === 0 ? null : filteredCat[0],
    });
  }
  return res.status(406).json({ message: "Wrong method", body: null });
}
