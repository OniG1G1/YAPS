import { sendJson } from "../utils/respond.js";
import { json } from "node:stream/consumers";

export async function registerAccount(req, res) {
    const accountData = await json(req);

    console.log({
        email: accountData.email,
        username: accountData.username,
        passwordReceived: Boolean(accountData.password)
    });

    sendJson(res, 201, { success: true })

}