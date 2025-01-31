CREATE OR REPLACE FUNCTION create_biaformtable()
    RETURNS void AS $$
    BEGIN
      IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'biaformtable'
      ) THEN
        CREATE TABLE biaformtable (
          id SERIAL PRIMARY KEY,
          hydration_goals TEXT,
          diet_nutrition TEXT,
          study_read TEXT,
          daily_progress_photo TEXT,
          mindfulness_practice TEXT,
          abstinence TEXT,
          connection_networking TEXT,
          consistency TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
        );
      END IF;
    END;
    $$ LANGUAGE plpgsql;
