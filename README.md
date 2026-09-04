# Email Service

A tiny Express app that exposes a login endpoint and an email send endpoint. No real email is sent — the send endpoint just returns a confirmation message.

## Run

```bash
npm install
npm start
```

Server starts on `http://localhost:3000`.

## Endpoints

### `POST /login`

Request body (JSON):

```json
{ "username": "admin", "password": "admin" }
```

Response:

```json
{ "status": "ok", "message": "Login successful.", "token": "token-1730000000000-ab12cd34" }
```

Wrong credentials return `401`.

### `POST /send`

Request body (JSON):

```json
{
  "to": "someone@example.com",
  "subject": "Hello",
  "body": "This is a test."
}
```

`to` and `subject` are required.

Response:

```json
{
  "status": "sent",
  "id": "email-1730000000000-ab12cd",
  "message": "Email to someone@example.com accepted (not actually sent).",
  "email": { "to": "someone@example.com", "subject": "Hello", "body": "This is a test." },
  "timestamp": "2026-09-04T00:00:00.000Z"
}
```

### `GET /health`

Returns `{ "status": "ok" }`.

## Examples

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

```bash
curl -X POST http://localhost:3000/send \
  -H "Content-Type: application/json" \
  -d '{"to":"a@b.com","subject":"Hi","body":"Hello there"}'
```

## License

MIT
