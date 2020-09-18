

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT || 5432,
})


const getPlayers = (request, response) => {
  pool.query('SELECT * FROM leaderboard ORDER BY id ASC LIMIT 10;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPlayerById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM leaderboard WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPlayer = (request, response) => {
  const { player, score } = request.body

  pool.query('INSERT INTO leaderboard (player, score) VALUES ($1, $2)', [player, score], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Player added with ID: ${result.insertId}`)
  })
}

const updatePlayer = (request, response) => {
  const id = parseInt(request.params.id)
  const { player, score } = request.body

  pool.query(
    'UPDATE leaderboard SET player = $1, score = $2 WHERE id = $3',
    [player, score, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Player modified with ID: ${id}`)
    }
  )
}

const deletePlayer = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM leaderboard WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Player deleted with ID: ${id}`)
  })
}

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
}
