const https = require("https");

const username = "xchange_YxWlB";
const password = "Xchangetechs+2024";
const body = {
    source: "amazon_product",
    domain: "in",
    query: "B07WHSNYL5",
    parse: true,
    context: [
        { key: "autoselect_variant", value: true },
    ],
};

const options = {
    hostname: "realtime.oxylabs.io",
    path: "/v1/queries",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization:
            "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    },
};

const request = https.request(options, (response) => {
    let data = "";

    response.on("data", (chunk) => {
        data += chunk;
    });

    response.on("end", () => {
        const responseData = JSON.parse(data);
        console.log(JSON.stringify(responseData, null, 2));
    });
});

request.on("error", (error) => {
    console.error("Error:", error);
});

request.write(JSON.stringify(body));
request.end();