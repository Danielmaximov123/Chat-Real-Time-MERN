const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
require('./config/db')
const http = require("http");
const { Server } = require("socket.io");

const app = express()

const server = http.createServer(app);
const io = new Server(server , {
    cors : {
        origin : '*',
        methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
})

app.use(cors())
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(express.json())

// Routers Path
const authRouter = require('./routers/authRouter')
const chatRouter = require('./routers/chatRouter')
const messageRouter = require('./routers/messageRouter')
const userRouter = require('./routers/usersRouter')

// Routers
app.use('/auth' , authRouter)
app.use('/chat' , chatRouter)
app.use('/messages' , messageRouter)
app.use('/user' , userRouter)

const PORT = 7000 || process.env.PORT

// socket.io
require('./socket/index')(io);

server.listen(PORT , () => {
    console.log(`The server is running in http://localhost:${PORT}`);
})