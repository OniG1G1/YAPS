// request-size limits, wrong Content-Type, network errors,
export function registerAccount(req, res) {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    })

    req.on("end", () => {
        const accountData = JSON.parse(body);

        console.log({
            email: accountData.email,
            username: accountData.username,
            passwrodReceived: Boolean(accountData.password)
        })
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({success: true}));
}