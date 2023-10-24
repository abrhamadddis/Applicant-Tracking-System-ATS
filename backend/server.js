const express = require('express')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/auth/users', require('./routes/authRoutes'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))