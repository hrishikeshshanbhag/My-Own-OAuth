import ApiError from "../../common/utils/api-error.js";
import { verifyCodeToken } from "../../common/utils/shortExpiry.util.js";
import * as jwtUtil from "../../common/utils/jwt.utils.js";
export function userLogin(clientId, code) {
  if (clientId !== process.env.CLIENT_ID)
    throw ApiError.badRequest("Failed to authenticate cliend id or code");
  const decoded = verifyCodeToken(code);
  if (!decoded) {
    throw ApiError.badRequest("failed to authenticate client id or code");
  }
  const { id, role } = decoded;
  const accessToken = jwtUtil.generateAccessToken({ id, role });
  const refreshToken = jwtUtil.generateRefreshToken({ id });

  return { accessToken, refreshToken };
}
