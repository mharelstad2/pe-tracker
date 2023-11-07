-- Create the "buttons" table to track behaviors
CREATE TABLE buttons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create the "log" table to track button clicks
CREATE TABLE log (
  button_id INTEGER REFERENCES buttons(id) NOT NULL,
  at TIMESTAMPTZ NOT NULL
);


-- Insert a sample button
INSERT INTO buttons (name) VALUES ('Test');
