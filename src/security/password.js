import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt)

async function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");

    const derivedKey = await scrypt(password, salt, 64);
    const hash = derivedKey.toString("hex");

    return {hash, salt};
}

async function verifyPassword(password, storedHash, salt) {
    const derivedKey = await scrypt(password, salt, 64);

    return crypto.timingSafeEqual(derivedKey, Buffer.from(storedHash, "hex"));
}

export { hashPassword, verifyPassword };