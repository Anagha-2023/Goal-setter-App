const express = require ('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require ('./config/db')
const port = process.env.PORT || 5000;
const {errorHandler} = require ('./middleware/errorMiddleware')

connectDB();

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/goals',require ('./routes/goalRoutes'))
app.use('/api/users',require ('./routes/userRoutes'))
app.use('/api/admin',require ('./routes/adminRoutes'));


app.use(errorHandler);

app.listen(port, ()=> console.log(`Server started on : http://localhost:${port}`))