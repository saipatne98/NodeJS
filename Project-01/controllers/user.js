const User = require("../models/user")

async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({error : "User not found"})
      }
      return res.json(user);
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id ,{last_name:"Patil",first_name :"Saiprasad"});
    return res.json({status:"success"});
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
      return res.json({status:"success"});
}

async function handleCreateNewUser(req,res){
    const body = req.body;
      
    if(
        !body || 
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title 
    ){
        return res.status(400).json({msg: "All fields are req..."});
    }
     let result;

    try {
        result=  await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title 
        });
    } catch (error) {
        console.error("Error Creating User :",error);
        return res.status(500).json({msg:"Internal Server Error"});
        
    }
   

    console.log("result",result);
     return res.status(201).json({msg:"success" , id :result.id});

    // console.log("body",body);
    // return res.json({status:"pending"});
   
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}

