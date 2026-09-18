# AutoGift API

Express 4 and Mongoose 8 backend for the AutoGift catalog and admin dashboard.

## Setup

```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```

Set `MONGO_URI` to a MongoDB database before starting the API. The server listens
on `PORT` (5000 by default).

## Endpoints

All responses are direct JSON values. Errors always use `{ "message": "..." }`.

- `GET/POST /api/products`, `GET/PUT/PATCH/DELETE /api/products/:id`
- `GET/POST /api/users`, `GET/PUT/PATCH/DELETE /api/users/:id`
- `PATCH /api/users/:id/status` with `{ "status": "active" | "blocked" }`
- `GET/POST /api/orders`, `GET/PUT/PATCH/DELETE /api/orders/:id`
- `PATCH /api/orders/:id/status`
- `GET /api/revenue` returns a six-calendar-month MongoDB aggregation summary
- `GET/POST /api/notifications`, `GET/PUT/PATCH/DELETE /api/notifications/:id`
- `PATCH /api/notifications/:id/read`

The seed command replaces existing documents in these four collections with the
catalog, users, orders, and activity values used by the client demo.
