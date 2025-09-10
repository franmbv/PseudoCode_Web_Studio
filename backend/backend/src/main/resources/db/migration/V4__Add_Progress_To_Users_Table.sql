-- db/migration/V4__Add_Progress_To_Users_Table.sql

ALTER TABLE users ADD COLUMN progress BIGINT;

UPDATE users SET progress = 0 WHERE progress IS NULL;

ALTER TABLE users ALTER COLUMN progress SET NOT NULL;