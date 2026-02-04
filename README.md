# AI Voice Agent Backend

Node.js + Express backend scaffolding for an AI voice agent with telephony webhooks, speech services, and appointment workflows.

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Key Endpoints

- `POST /webhook/call` - Incoming call webhook
- `POST /webhook/call-status` - Call status updates (missed call callback logic)
- `GET /health` - Service health check
