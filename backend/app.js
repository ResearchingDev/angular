const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = 3000;

// Middleware
app.use(cors())
app.use(bodyParser.json())

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const routes = require('./routes/routes')

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/api/hello', (req, res) => {
  res.send('Hello World!')
})