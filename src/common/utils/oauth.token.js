import { generatePublicPrivateKeys } from "./jwks.utils.js";
import jwt from "jsonwebtoken";
const generateOauthAccessToken = (payload) => {
  const { privateKey } = generatePublicPrivateKeys();
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
    issuer: "http://localhost:4000",
    audience: "1234",
    keyid: "1",
  });
};

const verifyOauthAccessToken = (token) => {
  const { publicKey } = generatePublicPrivateKeys();

  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    issuer: "http://localhost:4000",
    audience: "1234",
  });
};

export { generateOauthAccessToken, verifyOauthAccessToken };
