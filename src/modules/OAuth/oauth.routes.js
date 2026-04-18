import express from "express";
const oauthRouter = express.Router();
import * as controller from "./oauth.controller.js";
oauthRouter.get(
  "/authenticate/.well-known/openid-configuration",
  controller.handleOpenIdCongiguration,
);
oauthRouter.post("/token", controller.handleTokenGeneration);

export default oauthRouter;
