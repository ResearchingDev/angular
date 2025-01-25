const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = 3000;
const path = require('path');

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

// Serve Angular static files
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));

// Serve Angular's index.html for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../frontend/dist/frontend/index.html'));
});
