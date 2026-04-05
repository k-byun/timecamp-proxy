const express = require("express");
// const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// Proxy endpoint
app.post("/timecamp", async (req, res) => {
    try {
        const apiKey = process.env.TIMECAMP_API_KEY;

        const response = await fetch("https://app.timecamp.com/third_party/api/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${apiKey}`
                "Authorization": `Bearer ${process.env.TIMECAMP_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        const text = await response.text();
        res.status(response.status).send(text);

    } catch (err) {
        console.error(err);
        res.status(500).send("Proxy error");
    }
});

// health check (VERY IMPORTANT)
app.get("/", (req, res) => {
    res.send("Server is alive");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // console.log(`Proxy running on http://localhost:${PORT}`);
    console.log("Server is running on port", PORT);
});

