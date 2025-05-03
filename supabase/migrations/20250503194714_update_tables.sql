ALTER TABLE bookings DROP CONSTRAINT bookings_performed_by_fkey;

DROP TABLE IF EXISTS doctor;

ALTER TABLE tests
ADD COLUMN popular BOOLEAN DEFAULT false,
ADD COLUMN preparation TEXT,
ADD COLUMN report_time TEXT;

ALTER TABLE bookings
DROP COLUMN IF EXISTS performed_by,
DROP COLUMN IF EXISTS payment_status,
ADD COLUMN collection_location TEXT;
