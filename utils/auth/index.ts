import { User, users } from "@/pages/api/users";
import { NextApiRequest, NextApiResponse } from "next";
import { DefaultData } from "../utils";

interface CheckTokenResponse {
  invalid: boolean;
  expired?: boolean;
  user?: User;
}

export function checkToken(token: string): CheckTokenResponse {
  const filteredUsers = users.filter((user: User) => user.token === token);
  let user: User;
  if (filteredUsers.length > 0) {
    user = filteredUsers[0];
    if (new Date().getTime() - user.tokenExpires.getTime() > 0) {
      return { invalid: false, expired: true };
    }
    return { invalid: false, expired: false, user: user };
  }
  return { invalid: true };
}

export function auth(
  req: NextApiRequest,
  res: NextApiResponse<DefaultData>
): {
  isAuth: boolean;
  res?: any;
} {
  const { authorization } = req.headers;
  if (!authorization)
    return {
      isAuth: false,
      res: res.status(401).json({ message: "Not Authorized", body: null }),
    };
  const tokenInfo = checkToken(authorization);
  if (!tokenInfo.invalid) {
    if (tokenInfo.expired) {
      return {
        isAuth: false,
        res: res.status(403).json({ message: "Token expired", body: null }),
      };
    }
    return { isAuth: true, res: null };
  } else {
    return {
      isAuth: false,
      res: res.status(400).json({ message: "User not found", body: null }),
    };
  }
}
