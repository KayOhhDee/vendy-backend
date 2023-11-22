const express = require('express');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config()
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const PORT = process.env.PORT || 4000
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const { notFound, errorHandler } = require('./middlewares/errorHandler');
dbConnect()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/user", authRouter)
app.use("/api/product", productRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server is running at PORT', PORT)
})