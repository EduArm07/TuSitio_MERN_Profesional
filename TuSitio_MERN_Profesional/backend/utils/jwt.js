import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "workday_secret_2026";

export function createAccessToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3); // 3 horas

  const payload = {
    token_type: "access",
    user_id: user._id,
    rol: user.rol,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(expToken.getTime() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET);
}

export function createRefreshToken(user) {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1); // 1 mes

  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(expToken.getTime() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}