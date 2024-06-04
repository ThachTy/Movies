import { hashSync, compareSync } from 'bcrypt';

export const hashCrypt = async (data, salt) => {
  return await hashSync(data, salt);
};

export const compareCrypt = async (data, dataCrypted) => {
  return await compareSync(data, dataCrypted);
};
