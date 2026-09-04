# Mock Email Service

A tiny Express app with a single endpoint that *pretends* to send an email. No real email is sent — it just returns a message.

## Run

```bash
npm install
npm start
```

Server starts on `http://localhost:3000`.

## Endpoint

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
  "id": "mock-1730000000000-ab12cd",
  "message": "Mock email to someone@example.com accepted (not actually sent).",
  "email": { "to": "someone@example.com", "subject": "Hello", "body": "This is a test." },
  "timestamp": "2026-09-04T00:00:00.000Z"
}
```

## Example

```bash
curl -X POST http://localhost:3000/send \
  -H "Content-Type: application/json" \
  -d '{"to":"a@b.com","subject":"Hi","body":"Hello there"}'
```

There is also a `GET /health` check.

## License

MIT
