import { findAccountByEmail, saveAccount } from "../repositories/accountStore.js";
import { hashPassword, verifyPassword} from "../security/password.js"

export async function testStoredPassword(account) {
    const testPassword = "asd";

    const matches = await verifyPassword(testPassword, account.passwordHash, account.passwordSalt);
}

export async function registerAccount(accountData) {
    if (!accountData.email || !accountData.password) {
        console.log()
        return "INVALID_ACCOUNT";
    }

    const email = accountData.email.trim().toLowerCase();

    if (findAccountByEmail(email)) {
        return "EMAIL_ALREADY_EXISTS";
    }

    const {hash, salt} = await hashPassword(accountData.password);

    const account = {
        email, 
        passwordHash: hash, 
        passwordSalt: salt, 
        verified: false
    };

    saveAccount(account);

    testStoredPassword(account);
    return "SUCCESS";
}