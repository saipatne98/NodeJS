const express =require('express');

const{connectMongoDb} = require ("./connection");
const { logReqRes } =require("./middlewares/index");


const userRouter = require("./routes/user");

const app =express();
const PORT =8000;

//Connection 
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then(console.log("MongoDB Connected"));




//Schema


//model

//middleware - Plugin 
app.use(express.urlencoded({ extended:false }));

app.use(logReqRes('log.txt'));

//Routes
app.use('/api/users', userRouter);

app.listen(PORT,() => {console.log(`Server Started at PORT:8000`)});
