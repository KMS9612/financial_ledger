import bcrypt from "bcryptjs";

const pwHashing = async (password: string) => {

    const hashedPassword =await bcrypt.hash(password, 10);

    return hashedPassword;
}

export { pwHashing };
