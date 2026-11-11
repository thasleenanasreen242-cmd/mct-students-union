-- Execute once in your Neon SQL editor. Never run from a public API route.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS union_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('notice','library','event','activity','office_bearer')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  summary text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  pinned boolean NOT NULL DEFAULT false,
  starts_at timestamptz,
  ends_at timestamptz,
  expires_at timestamptz,
  category text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  media_url text,
  media_type text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS union_content_public_idx ON union_content(kind, status, pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS union_content_expiry_idx ON union_content(expires_at);
