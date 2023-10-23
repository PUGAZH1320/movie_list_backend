require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())


const list = require('./routes/list')
app.use('/list',list)


app.listen(4000,() => console.log(`Server Started at 4000`))