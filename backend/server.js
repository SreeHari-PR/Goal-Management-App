const express=require("express")
require('dotenv').config()
const userRoutes=require('./routes/userRoutes')
const goalRoutes=require('./routes/goalRoutes')
const admin=require('./routes/adminRoutes')
const port= process.env.PORT || 8000
const connectDB=require('./config/db')

const cors = require('cors');
const app=express()

app.use(cors({
    origin: 'http://localhost:5173'
  }));

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/goals', goalRoutes);
app.use('/', userRoutes);
app.use("/admin", admin);
app.listen(port,()=>console.log(`server started on port ${port}`))
