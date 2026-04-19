import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import oauthRouter from "./modules/OAuth/oauth.routes.js";
import ApiError from "./common/utils/api-error.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/oauth", oauthRouter);

// Catch-all for undefined routes
// app.all("{*path}", (req, res) => {
//   throw ApiError.notFound(`Route ${req.originalUrl} not found`);
// });
export default app;
