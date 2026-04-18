import * as service from "./oauth.service.js";
import "dotenv/config";
import ApiResponse from "../../common/utils/api-response.js";
export function handleOpenIdCongiguration(req, res) {
  res.json({
    issuer: `http://localhost:${process.env.PORT}`,
    authorization_endpoint: `http://localhost:${process.env.PORT}/api/auth/logincode`,
    token_endpoint: `http://localhost:${process.env.PORT}/api/oauth/token`,
    userinfo_endpoint: `http://localhost:${process.env.PORT}/api/auth/me`,
    jwks_uri: ``,
    redirect_uri: process.env.REDIRECT_URI,
  });
}

export function handleTokenGeneration(req, res) {
  const { clientId, code } = req.query;

  if (!clientId || !code) {
    return res.status(400).json({ error: "Missing clientId or code" });
  }
  const { accessToken, refreshToken } = service.userLogin(clientId, code);
  ApiResponse.ok(res, "generated access token and refresh token", {
    accessToken,
    refreshToken,
  });
}
