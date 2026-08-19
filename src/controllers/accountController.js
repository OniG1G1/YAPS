// request-size limits, wrong Content-Type, network errors,
export function registerAccount(req, res) {
    let body = "";

// overkill, check docs for simpler in req

    req.on("data", (chunk) => {
        body += chunk;
    })

    req.on("end", () => {
        const accountData = JSON.parse(body);

        console.log({
            email: accountData.email,
            username: accountData.username,
            passwordReceived: Boolean(accountData.password)
        });

        sendJson(res, 201, {success : true})
    })
}

// move to utils
function sendJson(res, statusCode, json) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(json));
}

// consider a json-body reader responsible for:
/*
Rejecting unsupported Content-Type with 415.
Enforcing a body-size limit and returning 413.
Returning 400 for empty or malformed JSON.
Handling aborted/erroring requests.
Decoding chunks predictably.
*/

/*
HTTP input
  → parse JSON
  → validate and normalize
  → check uniqueness
  → hash password
  → persist account
  → create HTTP response
  */