import { sendJson } from "../utils/respond.js";
import { json } from "node:stream/consumers";
import * as accountService from "../services/accountService.js";

export async function registerAccount(req,res) {

    try {
        accountData = await json(req);
    } catch {
        return sendJson(res, 400, {
            success: false,
            message: "Invalid JSON."
        });
    }

    const result = await accountService.registerAccount(accountData);

    if (result === "INVALID_ACCOUNT") {
        return sendJson(res, 400, {success: false, message
    });
    } 
    
    if (result === "EMAIL_ALREADY_EXISTS") {
        return sendJson(res, 409, { success: false});
    }

    return sendJson(res, 201, { success: true });
}