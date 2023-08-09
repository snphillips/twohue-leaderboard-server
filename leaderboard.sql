
-- Good reminder about working with postgresql here:
-- https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

-- ================================================
-- HOW TO DELETE DATABASE:
-- ================================================
-- In the terminal:
-- 1) To start postgres (assuming it is installed) type: psql
-- 2) To view the databases, type: \list
-- DROP DATABASE IF EXISTS twohueleaderboard;


-- ================================================
-- HOW TO CREATE DATABASE:
-- ================================================
-- CREATE DATABASE twohueleaderboard;


-- ================================================
-- HOW TO SEED DATABASE:
-- ================================================
--   In the terminal:
-- 1) To start postgres (assuming it is installed) type: psql
-- 2) To view the databases, type: \list
-- 3) To connect to the db in question, \connect or \c twohueleaderboard
-- 4) If it's not there, to create a new database, type CREATE DATABASE twohueleaderboard;
-- 5) To ensure that database got created, type \list
-- 6) To view the database tables (if there are any), type \dt

-- 7) THE FAST WAY: execute this file by typing in the command line:
-- $ psql
--   \i leaderboard.sql

-- THE SLOW WAY:
-- 7) Start fresh by dropping current table:
DROP TABLE IF EXISTS leaderboard;

-- 8) Crate the table
CREATE TABLE [IF NOT EXISTS] leaderboard (
id SERIAL PRIMARY KEY,
player VARCHAR (12) NOT NULL,
score SMALLINT NOT NULL
);


-- 9) To view the database tables, you created type \dt
-- 10) Insert some dummy values to get you started
-- (the RETURNING is just thre to show you that is happened)
INSERT INTO leaderboard(player, score)
VALUES ('george', 3), ('jerry', 9), ('kramer', 12), ('newman', 2), ('elaine', 78), ('puddy', 48, ('mulva', 23), ('penske', 1), ('mr pitt', 9), ('the drake', 7)
RETURNING player;


-- 10b) When seeding Heroku or AWS - Insert some dummy values to get you started
-- (the RETURNING is just thre to show you that is happened)
-- INSERT INTO leaderboard (player, score)
-- VALUES ('janeway', 3), ('7of9', 5), ('jean-luc', 5), ('data', 16), ('worf', 12), ('riker', 9)
-- RETURNING player;





