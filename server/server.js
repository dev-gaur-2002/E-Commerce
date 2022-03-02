const express =  require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDb = require('./db/connectDb')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const errorMiddleware = require('./middleware/error')
const path =  require('path')
const cors = require('cors')

// uncaught handle error excetion --> to handle any kind of non defined variable used type of error

process.on('uncaughtException',(error)=>{
    console.log(`server shutting down due to ${error}`)
    process.exit(1)
})


dotenv.config({})
const app = express()
const port = process.env.PORT || 3000

//middlewares

app.use(express.json()) // to parse body
app.use(cookieParser())
app.use(cors({
    " Access-Control-Allow-Origin":"*"
}))

app.use('/api/v1',productRoutes)
app.use('/api/v1',userRoutes)
app.use('/api/v1',orderRoutes)


 // special middlewares
app.use(errorMiddleware) // error middleware

// listen
const start = async ()=>{
    await connectDb(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`server connected successfully at port ${port}`)
    })
}

start()

// handling promise rejection

process.on('unhandledRejection',(err)=>{
    console.log(err)
    console.log('the server is shutting down due to unhandled rejection error')
    app.close(()=>{
        process.exit(1)
    })
})
