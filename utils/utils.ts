import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { LoremIpsum } from "lorem-ipsum";

export const reqMethods: string[] = ["POST", "GET", "HEAD", "PATCH", "DELETE"];

export const cors = Cors({
  methods: reqMethods,
});

export type DefaultData = {
  message: string;
  body: any;
};
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
