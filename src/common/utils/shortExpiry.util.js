import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateCodeToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_CODE_SECRET, {
    expiresIn: process.env.JWT_CODE_EXPIRES_IN || "5m",
  });
};

const verifyCodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_CODE_SECRET);
};

export { generateCodeToken, verifyCodeToken };
