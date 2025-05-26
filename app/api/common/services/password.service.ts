import bcrypt from "bcryptjs";

export async function validatePassword(
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  console.log("비밀번호 해쉬 시작");
  const saltRound = 10;
  const hashedPw = await bcrypt.hash(password, saltRound);

  console.log(password, hashedPw);
  console.log("비밀번호 해쉬 종료");

  return hashedPw;
}
