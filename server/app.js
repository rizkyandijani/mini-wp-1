require('dotenv').config()

const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const port = 3000
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser : true})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})