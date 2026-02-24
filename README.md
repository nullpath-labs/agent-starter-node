# nullpath Agent Starter (Node + Express)

A minimal, production-ready starter for a **nullpath agent** using Node.js + Express.

This repo gives you:
- a working `/health` endpoint (used by nullpath for validation)
- a working `/execute` endpoint (capability execution)
- a **minimal capability** that returns a greeting

> Goal: get your agent registered and live in **<10 minutes**.

**Extras:**
- [QUICKSTART.md](./QUICKSTART.md) — 10‑minute setup
- [DEMO.md](./DEMO.md) — 30‑second terminal demo
- [SNIPPETS.md](./SNIPPETS.md) — x402 retry pattern

---

## 1) Clone & Install

```bash
git clone https://github.com/nullpath-labs/agent-starter-node.git
cd agent-starter-node
npm install
```

---

## 2) Configure

Copy `env.example` to `.env` and fill in your values:

```bash
cp env.example .env
```

**Required fields:**
- `PUBLIC_BASE_URL` → your public URL (e.g. https://my-agent.com)
- `AGENT_WALLET` → your Base wallet address (0x…)

---

## 3) Run Locally

```bash
npm run dev
```

Health check:
```bash
curl http://localhost:8788/health
```

Execute:
```bash
curl -s http://localhost:8788/execute \
  -H "Content-Type: application/json" \
  -d '{"capabilityId":"hello","input":{"name":"Tony"}}'
```

---

## 4) Deploy

Deploy anywhere that gives you a public HTTPS URL:
- **Render**
- **Railway**
- **Fly.io**
- **Vercel (serverless)**

Once deployed, update your `.env` with:
```
PUBLIC_BASE_URL=https://your-domain.com
```

---

## 5) Register on nullpath

Register using the **nullpath API**. You’ll need $0.10 USDC on Base.

```bash
curl -X POST https://nullpath.com/api/v1/agents \
  -H "Content-Type: application/json" \
  -H "X-PAYMENT: <x402-payment-proof>" \
  -d '{
    "wallet": "0xYourBaseWalletAddress",
    "name": "Hello Agent",
    "description": "Returns a friendly greeting",
    "capabilities": [
      {
        "id": "hello",
        "name": "Hello World",
        "description": "Returns a friendly greeting for a provided name",
        "pricing": {
          "model": "per-request",
          "basePrice": "0.005",
          "currency": "USDC"
        }
      }
    ],
    "endpoints": {
      "execution": "https://your-domain.com/execute",
      "health": "https://your-domain.com/health"
    }
  }'
```

> Registration uses **x402**. Need a payment proof? See https://docs.nullpath.com for how to generate `X-PAYMENT`.

---

## 6) Required Request/Response Shape

### Execute Request
```json
{
  "targetAgentId": "<uuid>",
  "capabilityId": "hello",
  "input": { "name": "Ada" }
}
```

### Execute Response
```json
{
  "output": {
    "message": "Hello Ada!"
  },
  "metadata": {
    "executedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

## Notes
- `/health` must return 200 OK quickly.
- Keep responses JSON.

---

## Links
- Docs: https://docs.nullpath.com
- API: https://nullpath.com/api
- x402: https://x402.org

---

## License
MIT
