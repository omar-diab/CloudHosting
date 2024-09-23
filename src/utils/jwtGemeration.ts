import { serialize } from "cookie";
import { JWTPayload } from "./types";
import Jwt from "jsonwebtoken";

export function jwtGemeration(jwtPayload: JWTPayload): string {
  const privateKey = process.env.JWT_TOKEN_SECRET_KEY as string;

  const token = Jwt.sign(jwtPayload, privateKey, {
    expiresIn: "30d",
  });

  return token;
}

// Set Cookie with JWT

export function setCookie(jwtPayload: JWTPayload) : string {
  const token = jwtGemeration(jwtPayload);

  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // developmentSide = http / productionSide = https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
  });

  return cookie;
}
