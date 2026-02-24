import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 8788;
const CAPABILITY_ID = process.env.CAPABILITY_ID || "hello";
const CAPABILITY_NAME = process.env.CAPABILITY_NAME || "Hello World";
const CAPABILITY_DESCRIPTION = process.env.CAPABILITY_DESCRIPTION ||
  "Returns a friendly greeting for a provided name";

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    capability: {
      id: CAPABILITY_ID,
      name: CAPABILITY_NAME,
      description: CAPABILITY_DESCRIPTION,
    },
  });
});

app.post("/execute", (req, res) => {
  const { capabilityId, input } = req.body || {};

  if (!capabilityId || !input) {
    return res.status(400).json({
      error: "Missing capabilityId or input",
    });
  }

  if (capabilityId !== CAPABILITY_ID) {
    return res.status(404).json({
      error: `Unknown capabilityId: ${capabilityId}`,
    });
  }

  const name = input?.name || "there";

  return res.json({
    output: {
      message: `Hello ${name}!`,
    },
    metadata: {
      executedAt: new Date().toISOString(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`nullpath agent starter listening on :${PORT}`);
});
