import bcrypt from "bcryptjs";

const checkHashedPw = async (password: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
}

export { checkHashedPw };