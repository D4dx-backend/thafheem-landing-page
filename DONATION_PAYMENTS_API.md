# Donation Payments API (Razorpay)

Production-ready backend-only Razorpay donation integration.

- Base routes:
  - `/api/payments/*`
  - `/api/v1/payments/*`
- Frontend must only call these APIs.
- Frontend must never create Razorpay orders directly.
- Final payment status is webhook-driven.

---

## 1) Create Order

**POST** `/api/payments/create-order`

Creates a Razorpay order and stores it in MongoDB with `CREATED` status.

### Request Body Stub

```json
{
  "amount": 50000,
  "currency": "INR",
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "donorPhone": "+919999999999",
  "campaignId": "winter-relief-2026"
}
```

### Validation Rules

- `amount` must be integer paise (example: `50000` = INR 500.00)
- `amount` range controlled by:
  - `MIN_DONATION_PAISE`
  - `MAX_DONATION_PAISE`
- Supported `currency`: `INR`
- Invalid email/phone is rejected

### Success Response Stub (201)

```json
{
  "orderId": "order_Q1abcXYZ123",
  "amount": 50000,
  "currency": "INR",
  "keyId": "rzp_live_xxxxx"
}
```

### Error Response Stub

```json
{
  "error": "Amount is out of allowed range"
}
```

---

## 2) Verify Payment (Server-side Signature Validation)

**POST** `/api/payments/verify`

Validates Razorpay payment signature and cross-checks amount/order/currency from Razorpay API.
If valid, status becomes `PENDING` (not `PAID`) until webhook confirmation.

### Request Body Stub

```json
{
  "orderId": "order_Q1abcXYZ123",
  "paymentId": "pay_Q1defUVW789",
  "signature": "razorpay_signature_from_checkout"
}
```

### Success Response Stub (200)

```json
{
  "status": "PENDING",
  "message": "Payment signature verified. Awaiting webhook confirmation."
}
```

### Error Response Stubs

```json
{
  "error": "Invalid payment signature"
}
```

```json
{
  "error": "Payment metadata mismatch"
}
```

---

## 3) Razorpay Webhook (Source of Truth)

**POST** `/api/payments/webhook`

Consumes raw JSON body and verifies `x-razorpay-signature` using `RAZORPAY_WEBHOOK_SECRET`.

> Note: webhook URL must be publicly reachable from Razorpay servers.
> Example: `https://your-domain.com/api/payments/webhook`

### Handled Events

- `payment.captured` -> status `PAID`
- `payment.failed` -> status `FAILED`
- `order.paid` -> status `PAID`

### Required Headers

- `x-razorpay-signature`
- `x-razorpay-event-id` (used for idempotency dedupe when provided)

### Webhook Payload Stub

```json
{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_Q1defUVW789",
        "order_id": "order_Q1abcXYZ123",
        "amount": 50000,
        "currency": "INR"
      }
    }
  }
}
```

### Success Response Stub (200)

```json
{
  "received": true
}
```

### Error Response Stub

```json
{
  "error": "Invalid webhook signature"
}
```

---

## Payment Status Lifecycle

- `CREATED` -> order created in backend + Razorpay
- `PENDING` -> verify API signature passed, waiting webhook
- `PAID` -> finalized by webhook (`payment.captured` or `order.paid`)
- `FAILED` -> finalized by webhook (`payment.failed`)

### Why verify returns `PENDING` after successful payment

This is expected behavior. `POST /api/payments/verify` only validates the checkout signature and marks `PENDING`.  
Final status (`PAID`/`FAILED`) is updated only when Razorpay webhook is received and verified.

---

## MongoDB Model Snapshot (`DonationPayment`)

```json
{
  "orderId": "order_Q1abcXYZ123",
  "paymentId": "pay_Q1defUVW789",
  "amount": 50000,
  "currency": "INR",
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "donorPhone": "+919999999999",
  "campaignId": "winter-relief-2026",
  "status": "PAID",
  "razorpayPayload": {},
  "webhookPayload": {},
  "lifecycleLogs": [],
  "createdAt": "2026-02-11T12:00:00.000Z",
  "updatedAt": "2026-02-11T12:00:10.000Z"
}
```

---

## Environment Variables

```env
MONGO_URI=
MONGO_MAX_POOL_SIZE=20

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

MIN_DONATION_PAISE=100
MAX_DONATION_PAISE=10000000

PAYMENT_API_RATE_LIMIT_WINDOW_MS=60000
PAYMENT_API_RATE_LIMIT_MAX=30

RAZORPAY_WEBHOOK_IP_ALLOWLIST=
```

Configured amount limits:

- Minimum: `100` paise (₹1)
- Maximum: `10000000` paise (₹1,00,000)

---

## Security Notes

- No Razorpay secrets are returned in API responses.
- Signature verification is strictly server-side.
- `verify` endpoint does not finalize payment as success.
- Webhook is the final source of truth.
- Duplicate webhook retries are handled safely (idempotent updates + immutable audit logs).

---

## Local Testing Helper

For collecting `orderId`, `paymentId`, and `signature` easily in local testing:

- Open `payment-test-checkout.html` from a local static server.
- Complete checkout, then copy generated verify JSON.
- Use copied payload in `POST /api/payments/verify`.

---

## Webhook Troubleshooting Checklist

- Ensure deployed backend has payment routes and webhook path returns non-404.
- Ensure webhook secret in Razorpay dashboard exactly matches `RAZORPAY_WEBHOOK_SECRET`.
- Ensure webhook events enabled: `payment.captured`, `payment.failed`, `order.paid`.
- Resend webhook from Razorpay dashboard for already-paid transactions.

