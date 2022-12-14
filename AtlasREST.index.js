const express = require('express')
const bodyParser = require('body-parser')
const routes = require("./routes")

const query = require('./models/car')

require('dotenv').config()
//console.log(process.env)

// instalize app
const app = express();
app.use(bodyParser.json())
app.use('/', routes);

// Connection to MongoDb in clouds...
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoURL = process.env.MONGO_CONNECTION_URL

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))


const port = 3000;

// Log port to server terminal
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});