-- Create a sequence for token numbers
CREATE SEQUENCE IF NOT EXISTS thit_token_seq START 1;

-- Create a function to generate sequential token
CREATE OR REPLACE FUNCTION generate_sequential_token()
RETURNS TRIGGER AS $$
BEGIN
  -- Generate token like C001, C002, etc.
  NEW.token_number := 'C' || LPAD(nextval('thit_token_seq')::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS set_token_number ON thit_registrations;

-- Create trigger to auto-generate token on insert
CREATE TRIGGER set_token_number
  BEFORE INSERT ON thit_registrations
  FOR EACH ROW
  EXECUTE FUNCTION generate_sequential_token();
