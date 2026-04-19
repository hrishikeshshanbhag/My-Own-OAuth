import * as service from "./oauth.service.js";
import "dotenv/config";
import ApiResponse from "../../common/utils/api-response.js";
export function handleOpenIdCongiguration(req, res) {
  res.json({
    issuer: `http://localhost:${process.env.PORT}`,
    authorization_endpoint: `http://localhost:${process.env.PORT}/api/auth/logincode`,
    token_endpoint: `http://localhost:${process.env.PORT}/api/oauth/token`,
    userinfo_endpoint: `http://localhost:${process.env.PORT}/api/oauth/userinfo`,
    jwks_uri: `http://localhost:${process.env.PORT}/api/oauth/jwks`,
    redirect_uri: process.env.REDIRECT_URI,
  });
}

export function handleTokenGeneration(req, res) {
  const { clientId, code } = req.body;

  if (!clientId || !code) {
    return res.status(400).json({ error: "Missing clientId or code" });
  }
  const { accessToken } = service.userLogin(clientId, code);
  ApiResponse.ok(res, "generated access token", {
    accessToken,
  });
}

export function generateJwksUri(req, res) {
  const jwks = service.generatesJwksKeys();
  ApiResponse.ok(res, "jwks keys", jwks);
}
export async function handleUserInfo(req, res) {
  let token = null;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw ApiError.unauthorized("Not authenticated");
  const user = await service.getUserInfo(token);
  ApiResponse.ok(res, "user details", user);
}
