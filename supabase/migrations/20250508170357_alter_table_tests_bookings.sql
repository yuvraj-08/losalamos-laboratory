ALTER TABLE tests_bookings
ADD COLUMN status TEXT DEFAULT 'pending',
ADD COLUMN doc_link TEXT;
