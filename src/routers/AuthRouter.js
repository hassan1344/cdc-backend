import { Router } from "express";

import AuthController from "../controllers/AuthController.js";
export let AuthRouter = Router();

AuthRouter.route("/signUp").post(AuthController.signUp);
AuthRouter.route("/login").post(AuthController.login);
