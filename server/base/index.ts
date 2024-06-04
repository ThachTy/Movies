import { createToken, verifyToken } from './jwt.js';
import { hashCrypt, compareCrypt } from './crypte.js';
const responseCreatetor = (res, code, message?, data?, token?) => {
  return res.status(code).send({
    code,
    message,
    data,
    token,
  });
};

const changeDateToString = (date: string) => {
  let arrayDate = date.split(/[/-]/);
  return `${arrayDate[0]}/${arrayDate[1]}/${arrayDate[2]}`;
};

export {
  responseCreatetor,
  createToken,
  verifyToken,
  hashCrypt,
  compareCrypt,
  changeDateToString,
};
