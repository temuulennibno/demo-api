import { checkToken } from "@/utils/auth";
import { cors, runMiddleware } from "@/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";

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
    const { authorization } = req.headers;
    if (!authorization)
      return res
        .status(401)
        .json({ message: "Not Authorized required", body: null });
    const tokenInfo = checkToken(authorization);
    if (!tokenInfo.invalid) {
      if (tokenInfo.expired) {
        return res.status(403).json({ message: "Token expired", body: null });
      }
      return res.status(200).json({ message: "Success", body: tokenInfo.user });
    }
    return res.status(400).json({ message: "User not found", body: null });
  }
  return res.status(406).json({ message: "Wrong method", body: null });
}
