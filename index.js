//initialize express
const express = require('express')
const app = express()

// initialize mongodb
const MongoClient = require('mongodb').MongoClient;

// initialize cors
var cors = require('cors');
app.use(cors());

// initialize env
require('dotenv').config()
const port = 5500

// for body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// mondo driver code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1pom7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const reviewCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`);
  console.log(err)


// review insert into mongodb
app.post('/addReview', (req, res) => {
   const reviewData = req.body; 
   reviewCollection.insertOne(reviewData)
   .then(result => {
     res.send(result.insertedCount > 0)
     console.log(result);
   })
})

// review  read data
app.get('/reviewInfo', (req, res) => {
  reviewCollection.find({})
  .toArray((error, documents) => {
      res.send(documents)
  })
})

});







app.listen(port)
