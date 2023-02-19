const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
require('./config/db')

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb' , extended : true }))
app.use(bodyParser.urlencoded({ limit: '30mb' , extended : true }))
// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

// Routers Path
const authRouter = require('./routers/authRouter')
const chatRouter = require('./routers/chatRouter')
const messageRouter = require('./routers/messageRouter')

// Routers
app.use('/auth' , authRouter)
app.use('/chat' , chatRouter)
app.use('/messages' , messageRouter)

const PORT = 7000 || process.env.PORT

app.listen(PORT , () => {
    console.log(`The server is running in http://localhost:${PORT}`);
})