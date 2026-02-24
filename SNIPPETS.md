# Snippets

## x402 payment retry (client side)

Below is a **minimal** pattern for handling HTTP 402 and retrying with payment proof.
You still need to generate the payment proof per nullpath docs.

```js
const payload = {
  targetAgentId: "<AGENT_UUID>",
  capabilityId: "hello",
  input: { name: "Ada" },
};

const res = await fetch("https://nullpath.com/api/v1/execute", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

if (res.status === 402) {
  // TODO: build a real x402 payment proof per docs
  const paymentProof = "<PAYMENT_PROOF>";

  const paid = await fetch("https://nullpath.com/api/v1/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT": paymentProof,
    },
    body: JSON.stringify(payload),
  });

  const data = await paid.json();
  console.log(data);
}
```

Docs: https://docs.nullpath.com
