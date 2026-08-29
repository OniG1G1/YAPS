import { sendJson } from "../utils/respond.js";
import { json } from "node:stream/consumers";
import * as accountService from "../services/accountService.js";

/**
 * @todo implement data validation of correct json fields in both fields (e.g. messages)
 * @todo unexpected results/errors
 * @ participate in async-handler contract OR implement OWN json() method which is sync
 */

export async function registerAccount(req, res) {

    let accountData;
    
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
        return sendJson(res, 400, {
            success: false, 
            message: "Valid email and password are required."
        });
    }

    if (result === "EMAIL_ALREADY_EXISTS") {
        return sendJson(res, 409, { 
            success: false,
            message: "This email is already in use." 
        });
    }

    return sendJson(res, 201, { success: true });
}