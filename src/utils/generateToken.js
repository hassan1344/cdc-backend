import jwt from "jsonwebtoken";
import server from "../config/server.js";

export const generateToken = (payload) => {
  const token = jwt.sign(payload, server.JWT_SECRET || "fallback_secret", {
    expiresIn: "1d",
  });
  return token;
};
