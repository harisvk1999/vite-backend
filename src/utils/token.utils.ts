import jwt from "jsonwebtoken";

const JWT = {
  jwt: process.env.JWT_SECRET,
  jwtExp: "6h",
};

export const createToken = (uid: string) => {
  return jwt.sign({ uid }, JWT.jwt, {
    expiresIn: JWT.jwtExp,
  });
};

export const verifyToken = (
  token: string
): { uid: string; expired: boolean } => {
  const now = Date.now() / 1000;

  const data = jwt.verify(token, JWT.jwt) as { uid: string; exp: number };

  return {
    uid: data.uid,
    expired: now >= data.exp,
  };
};
