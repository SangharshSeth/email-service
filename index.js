const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Hardcoded credentials for this simple service.
const CREDENTIALS = { username: "admin", password: "admin" };

app.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Fields 'username' and 'password' are required.",
    });
  }

  if (username !== CREDENTIALS.username || password !== CREDENTIALS.password) {
    return res.status(401).json({ status: "error", message: "Invalid credentials." });
  }

  const token = `token-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return res.status(200).json({
    status: "ok",
    message: "Login successful.",
    token,
  });
});

app.post("/send", (req, res) => {
  const { to, subject, body } = req.body || {};

  if (!to || !subject) {
    return res.status(400).json({
      status: "error",
      message: "Fields 'to' and 'subject' are required.",
    });
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  console.log(`[email] send ${id} to ${to}: ${subject}`);

  return res.status(200).json({
    status: "sent",
    id,
    message: `Email to ${to} has been sent.`,
    email: { to, subject, body: body || "" },
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Email service listening on http://localhost:${PORT}`);
});

module.exports = app;
