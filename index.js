const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

const N8N_WEBHOOK_URL = "https://ai.pixelprofiteering.com/webhook/oa-tradehook";

app.post("/hook/:id", async (req, res) => {
  console.log("OA webhook received:", req.body);

  try {
    const forward = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const result = await forward.text();
    console.log("Forwarded to n8n:", result);
    res.sendStatus(200);
  } catch (err) {
    console.error("Forwarding failed:", err.message);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Relay live on port ${PORT}`));
