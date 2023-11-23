const express=require('express');
const colors=require('colors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const cors=require('cors')
const connectDB=require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

connectDB();


const app=express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/faculty',require('./routes/facultyRoutes'))



app.get('/',(req,res)=>{
    res.status(200).send({
        message:"server running",
    })
})
const port=process.env.PORT||5000

app.listen(port,()=>{
    console.log(`server running on ${process.env.DEV_MODE} and running on ${process.env.PORT}`.bgCyan.white);
});