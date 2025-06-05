import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret-key";

type TokenReturnType = {
  accessToken: string;
  refreshToken: string;
};

/** return {accessToken, refreshToken} */
export function generateTokens(email: string): TokenReturnType {
  const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return {
    accessToken,
    refreshToken,
  };
}
