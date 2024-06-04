import * as jwt from 'jsonwebtoken';

const { JWT_SECRECT_KEY } = process.env;

export const createToken = (data, exp) => {
  return jwt.sign({ ...data }, JWT_SECRECT_KEY, {
    expiresIn: exp,
  });
};

export const verifyToken = (token) => {
  let codedToken = jwt.verify(token, JWT_SECRECT_KEY, (err, decoded) => {
    if (err) return null;

    return decoded;
  });

  return codedToken;
};
