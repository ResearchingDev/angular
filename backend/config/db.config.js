const { Client } = require('pg');
const dotenv = require('dotenv')

dotenv.config()

const connection = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
})

connection.connect(err => {
  if (err) throw err
  console.log('Connected to PostgreSQL Database')
})

module.exports = connection
