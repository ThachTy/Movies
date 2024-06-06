import * as jwt from 'jsonwebtoken';
import { decode } from 'punycode';

const { JWT_SECRECT_KEY } = process.env;

export const createToken = (data, exp) => {
  return jwt.sign({ ...data }, JWT_SECRECT_KEY, {
    expiresIn: exp,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRECT_KEY, (error, decoded) => {
    if (error) return error;

    return decoded;
  });
};
