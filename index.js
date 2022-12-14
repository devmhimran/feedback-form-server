const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())
require('dotenv').config()




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ghravcb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
  try {

    const feedbackCollection = client.db('Feedback-form').collection('form-data');

    app.get('/form-all-data', async (req,res) =>{
      const query = {};
      const cursor = feedbackCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });


    app.post('/feedback-form', (req, res) =>{
      const addData = req.body;
      const result = feedbackCollection.insertOne(addData)
      res.send(result)

    })
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Welcome to feedback form')
})

app.listen(port, () => {
  console.log(`Port - ${port}`)
})