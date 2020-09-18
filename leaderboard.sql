
-- Good reminder about working with postgresql here:
-- https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

-- ================================================
-- HOW TO DELETE DATABASE:
-- ================================================
-- DROP DATABASE IF EXISTS twohue-leaderboard;


-- ================================================
-- HOW TO CREATE DATABASE:
-- ================================================
-- CREATE DATABASE twohue-leaderboard;


-- ================================================
-- HOW TO SEED DATABASE:
-- ================================================
--   In the terminal:
-- 1) To start postgres (assuming it is installed) type: psql
-- 2) To view the databases, type: \list
-- 3) To connect to the db in question, \connect or \c twohue-leaderboard
-- 4) If it's not there, to create a new database, type CREATE DATABASE twohue-leaderboard;
-- 5) To ensure that database got created, type \list
-- 6) To view the database tables (if there are any), type \dt

-- 7) THE FAST WAY: execute this file by typing in the command line:
-- $ psql
--   \i leaderboard.sql

-- THE SLOW WAY:
-- 7) Start fresh by droppin current table:
DROP TABLE IF EXISTS leaderboard;

-- 8) Crate the table
CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
	player VARCHAR (12) NOT NULL,
	score SMALLINT NOT NULL
	);


-- 9) To view the database tables, you created type \dt
-- 10) Insert some dummy values to get you started
-- (the RETURNING is just thre to show you that is happened)
INSERT INTO leaderboard (player, score)
VALUES ('janeway', 3), ('7of9', 5), ('jean-luc', 5), ('data', 16), ('worf', 12), ('riker', 9)
RETURNING player;
