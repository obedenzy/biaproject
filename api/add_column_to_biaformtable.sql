CREATE OR REPLACE FUNCTION add_column_to_biaformtable(column_name text, column_type text)
    RETURNS void AS $$
    BEGIN
      EXECUTE format('ALTER TABLE biaformtable ADD COLUMN IF NOT EXISTS %I %s', column_name, column_type);
    END;
    $$ LANGUAGE plpgsql;
