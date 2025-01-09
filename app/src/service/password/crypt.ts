import crypt from "bcryptjs";

// pw hashing function return value is hashed password
const pwHashing = async (normalPw: string) => {
  const hashed_pw = await crypt.hash(normalPw, 10);

  return hashed_pw;
};

// if return value is 'false' then pw is not matching
const checkHashedPw = async (normalPw: string, hashedPw: string) => {
  const isVerified = await crypt.compare(normalPw, hashedPw);

  return isVerified;
};

export { pwHashing, checkHashedPw };
