-- Create buttons table
CREATE TABLE buttons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create log table
CREATE TABLE log (
  id SERIAL PRIMARY KEY,
  button_id INTEGER NOT NULL,
  at TIMESTAMPTZ NOT NULL
);

-- Insert a sample button
INSERT INTO buttons (name) VALUES ('Test');
