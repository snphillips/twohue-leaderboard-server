const Pool = require('pg').Pool;

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   database: process.env.DATABASE,
//   port: process.env.PORT || 5432,
//   URI: process.env.URI,
//   connectionString: process.env.DATABASE_URL,
//   user: process.env.USER,
//   password: process.env.DBPASSWORD,
//   database_url: process.env.DATABASE_URL,
//   // comment out the ssl rejectUnauthorized block
//   // when in development
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const getPlayers = async (request, response, next) => {
  try {
    const results = await pool.query('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10');
    response.status(200).json(results.rows);
  } catch (error) {
    next(error);
  }
};

const getPlayerById = async (request, response, next) => {
  const id = parseInt(request.params.id);

  try {
    const results = await pool.query('SELECT * FROM leaderboard WHERE id = $1', [id]);
    if (!results.rows.length) {
      return response.status(404).json({ error: `Player with ID ${id} not found` });
    }
    response.status(200).json(results.rows);
  } catch (error) {
    next(error);
  }
};

const createPlayer = async (request, response, next) => {
  const { player, score } = request.body;

  if (!player || score === undefined) {
    return response.status(400).json({ error: 'player and score are required' });
  }

  try {
    const results = await pool.query(
      'INSERT INTO leaderboard (player, score) VALUES ($1, $2) RETURNING id',
      [player, score]
    );
    response.status(201).json({ message: `Player added with ID: ${results.rows[0].id}` });
  } catch (error) {
    next(error);
  }
};

const updatePlayer = async (request, response, next) => {
  const id = parseInt(request.params.id);
  const { player, score } = request.body;

  if (!player || score === undefined) {
    return response.status(400).json({ error: 'player and score are required' });
  }

  try {
    const results = await pool.query(
      'UPDATE leaderboard SET player = $1, score = $2 WHERE id = $3',
      [player, score, id]
    );
    if (!results.rowCount) {
      return response.status(404).json({ error: `Player with ID ${id} not found` });
    }
    response.status(200).json({ message: `Player modified with ID: ${id}` });
  } catch (error) {
    next(error);
  }
};

const deletePlayer = async (request, response, next) => {
  const id = parseInt(request.params.id);

  try {
    const results = await pool.query('DELETE FROM leaderboard WHERE id = $1', [id]);
    if (!results.rowCount) {
      return response.status(404).json({ error: `Player with ID ${id} not found` });
    }
    response.status(200).json({ message: `Player deleted with ID: ${id}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
