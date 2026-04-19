import { generateKeyPairSync } from "node:crypto";
import fs from "node:fs";

export function generatePublicPrivateKeys() {
  if (!fs.existsSync("private.pem") || !fs.existsSync("public.pem")) {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });
    const privateKeyRaw = privateKey.export({
      type: "pkcs1",
      format: "pem",
    });
    const publicKeyRaw = publicKey.export({
      type: "spki",
      format: "pem",
    });
    fs.writeFileSync("private.pem", privateKeyRaw);
    fs.writeFileSync("public.pem", publicKeyRaw);
  }
  const privateKey = fs.readFileSync("private.pem", "utf-8");
  const publicKey = fs.readFileSync("public.pem", "utf-8");
  return {
    publicKey,
    privateKey,
  };
}
