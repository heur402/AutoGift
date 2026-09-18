# Shoplite API

## Setup

```bash
cd server
copy .env.example .env
npm install
npm run seed
npm run dev
```

The API listens on `http://localhost:5000` by default. Errors use
`{ "message": "..." }`.

## Curl examples

```bash
curl http://localhost:5000/api/health
curl "http://localhost:5000/api/products?search=wireless&sort=price-asc&limit=10"
curl http://localhost:5000/api/products/p-001
curl -X POST http://localhost:5000/api/products -H "Content-Type: application/json" -d "{\"id\":\"p-021\",\"name\":\"USB Cable\",\"price\":9.99,\"category\":\"Cables\",\"rating\":4,\"images\":[\"https://picsum.photos/seed/p021/800/800\"],\"description\":\"A USB cable.\"}"
curl -X PUT http://localhost:5000/api/products/p-021 -H "Content-Type: application/json" -d "{\"price\":10.99}"
curl -X DELETE http://localhost:5000/api/products/p-021

curl "http://localhost:5000/api/users?status=active&search=alice"
curl http://localhost:5000/api/users/u-1001
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d "{\"id\":\"u-1011\",\"name\":\"New User\",\"email\":\"new@example.com\"}"
curl -X PATCH http://localhost:5000/api/users/u-1011/status -H "Content-Type: application/json" -d "{\"status\":\"blocked\"}"
curl -X DELETE http://localhost:5000/api/users/u-1011

curl "http://localhost:5000/api/orders?userId=u-1001&status=delivered"
curl http://localhost:5000/api/orders/o-5001
curl -X POST http://localhost:5000/api/orders -H "Content-Type: application/json" -d "{\"userId\":\"u-1001\",\"productId\":\"p-001\"}"
curl -X PATCH http://localhost:5000/api/orders/o-5001/status -H "Content-Type: application/json" -d "{\"status\":\"shipped\"}"
curl -X DELETE http://localhost:5000/api/orders/o-5001

curl http://localhost:5000/api/revenue/summary

curl -X POST http://localhost:5000/api/notifications -H "Content-Type: application/json" -d "{\"userId\":\"u-1001\",\"message\":\"Your order shipped.\"}"
curl http://localhost:5000/api/notifications/u-1001
curl -X PATCH http://localhost:5000/api/notifications/a-1/read
```
