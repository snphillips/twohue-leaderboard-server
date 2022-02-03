## Twohue Leaderboard Server

This is the backend server for the color-mixing game TwoHue.
TwoHue the React app can be found here: https://github.com/snphillips/twohue.git

View the deployed game here: https://twohue.surge.sh/

This repo contains the server which tracks the highest score players in a leaderboard.

## Getting Started

clone this repo:

`git clone https://github.com/snphillips/twohue-leaderboard-server.git`

get into the correct directory:

`cd twohue-leaderboard-server`

run npm to install all the dependencies:

`npm install`

start the server:

`npm start`

your browser should open to http://localhost:3001/ !

Now you need to create the database. To start postgres (assuming it is installed) type: 

`psql`

To view your databases out of curiosity, type: 

`\list`

Create the database for this project:

`CREATE DATABASE twohueleaderboard;`

Now create the table:

`CREATE TABLE IF NOT EXISTS twohueleaderboard (
  id SERIAL PRIMARY KEY,
	player VARCHAR (12) NOT NULL,
	score SMALLINT NOT NULL
	);`

To view the database table you created type:

`\dt`

Insert some dummy values to get you started (the "RETURNING player" is optional but it shows you the players for you to confirm the seeding worked):

`INSERT INTO twohueleaderboard (player, score)
VALUES ('george', 0), ('jerry', 0), ('kramer', 0), ('newman', 0), ('elaine', 0), ('puddy', 0), ('mulva', 0), ('penske', 0), ('mr pitt', 0), ('the drake', 0)
RETURNING player;`
