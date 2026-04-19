import ApiError from "../../common/utils/api-error.js";
import { verifyCodeToken } from "../../common/utils/shortExpiry.util.js";
import { generatePublicPrivateKeys } from "../../common/utils/jwks.utils.js";
import { createPublicKey } from "node:crypto";
import {
  generateOauthAccessToken,
  verifyOauthAccessToken,
} from "../../common/utils/oauth.token.js";
import User from "../auth/auth.model.js";
export function userLogin(clientId, code) {
  if (clientId !== process.env.CLIENT_ID)
    throw ApiError.badRequest("Failed to authenticate cliend id or code");
  const decoded = verifyCodeToken(code);
  if (!decoded) {
    throw ApiError.badRequest("failed to authenticate client id or code");
  }
  const { id, role } = decoded;
  const accessToken = generateOauthAccessToken({ sub: id, role });

  return { accessToken };
}

export function generatesJwksKeys() {
  const { publicKey } = generatePublicPrivateKeys();

  const keyObject = createPublicKey(publicKey);

  const jwk = keyObject.export({ format: "jwk" });
  const jwksPublicKey = { ...jwk, kid: "1", alg: "RS256" };

  const jwks = {
    keys: [jwksPublicKey],
  };
  return jwks;
}
export async function getUserInfo(token) {
  const decoded = verifyOauthAccessToken(token);
  if (!decoded) {
    throw ApiError.badRequest("invalid or expired token");
  }
  const user = await User.findById(decoded.sub);

  if (!user) {
    throw ApiError.notfound("No user found");
  }
  return user;
}
