const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Single endpoint: pretend to send an email. Nothing is actually sent.
app.post("/send", (req, res) => {
  const { to, subject, body } = req.body || {};

  if (!to || !subject) {
    return res.status(400).json({
      status: "error",
      message: "Fields 'to' and 'subject' are required.",
    });
  }

  const id = `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  console.log(`[mock-email] would send email ${id} to ${to}: ${subject}`);

  return res.status(200).json({
    status: "sent",
    id,
    message: `Mock email to ${to} accepted (not actually sent).`,
    email: { to, subject, body: body || "" },
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Mock email service listening on http://localhost:${PORT}`);
});

module.exports = app;
