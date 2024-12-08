const express =require('express');
const users = require('./MOCK_DATA.json');
const fs = require ("fs");
const mongoose = require ("mongoose");
const { type } = require('os');

const app =express();
const PORT =8000;

//Connection 
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(console.log("MongoDB Connected"))
.catch(err=>console.log("mongo Error",err));



//Schema


//model

//middleware - Plugin 
app.use(express.urlencoded({ extended:false }));

//Routes

app.listen(PORT,() => {console.log(`Server Started at PORT:8000`)});
