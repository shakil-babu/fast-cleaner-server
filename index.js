//initialize express
const express = require('express')
const app = express()

// initialize cors
var cors = require('cors');
app.use(cors());

// initialize env
require('dotenv').config()
const port = 5500

// for body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
