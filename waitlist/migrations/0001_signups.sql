-- One row per email. No IP addresses or other tracking are stored.
CREATE TABLE IF NOT EXISTS signups (
  email      TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  source     TEXT
);
