import fs from "node:fs";
import { ACCOUNTS_FILE } from "../config.js"

function getAccounts() {
    const data = fs.readFileSync(ACCOUNTS_FILE, "utf-8");
    return JSON.parse(data);
}

function findAccountByEmail(email) {
    const accounts = getAccounts();

    return accounts.find(account => account.email === email);
}

function saveAccount(account) {
    const accounts = getAccounts();

    accounts.push(account);

    fs.writeFileSync(
        ACCOUNTS_FILE,
        JSON.stringify(accounts, null, 2)
    );
}

export { findAccountByEmail, saveAccount};