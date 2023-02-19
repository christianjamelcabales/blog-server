require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const port  = process.env.PORT || 3000 ;
const app = express();

app.use(cors())

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
mongoose.set('strictQuery', false);
const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json())

const blogsRouter = require('./routes/blogs')
app.use('/blogs', blogsRouter)

app.get("/", function(req, res){ //request, response
    res.send("<h1>Server is Running:)</h1>");
})

app.listen(port, ()=>{
    console.log(`Server is Running on PORT ${port}`);
})