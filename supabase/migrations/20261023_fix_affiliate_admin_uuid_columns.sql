-- ==============================================================================
-- CC CARVAN — FIX AFFILIATE ADMIN UUID COLUMNS
-- Converts approved_by and processed_by from UUID to TEXT to safely allow
-- admin usernames (e.g. 'mfe_admin', 'ccc_admin') as well as UUIDs.
-- ==============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'affiliates' 
          AND column_name = 'approved_by' 
          AND data_type = 'uuid'
    ) THEN
        ALTER TABLE public.affiliates ALTER COLUMN approved_by TYPE TEXT USING approved_by::text;
    END IF;

    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'withdrawals' 
          AND column_name = 'processed_by' 
          AND data_type = 'uuid'
    ) THEN
        ALTER TABLE public.withdrawals ALTER COLUMN processed_by TYPE TEXT USING processed_by::text;
    END IF;
END $$;
