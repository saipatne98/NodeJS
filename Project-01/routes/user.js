const express = require("express");

const router = express.Router();


router.get('/users',async (req,res)=>{
    const allDbUsers = await User.find({});
      const html =`
      <ul>
          ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
      </ul>
      `; // Here We are giving a server side rendered HTML file to client (browser) It is SSR (Server Side Rendering ) It is very fast 
      return res.send(html);
  })
  
  //REST API  
  router.get('/api/users',async (req,res)=>{
  
      const allDbUsers = await User.find({});
      res.setHeader("X-myName","Sai Patne"); //setting headers
      //console.log(req.headers);
  
      return res.json(allDbUsers);
  });
  
  router
     .route("/api/users/:id")//Giving a common route for different requests
     .get(async(req,res)=>{
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({error : "User not found"})
      }
      return res.json(user);
      // 
      
     })
     .patch(async (req,res)=>{
      // Edit user with Id
       await User.findByIdAndUpdate(req.params.id ,{last_name:"Patil",first_name :"Saiprasad"});
      return res.json({status:"success"});
     })
     .delete(async(req,res)=>{
      //Deletes user with ID
      await User.findByIdAndDelete(req.params.id);
      return res.json({status:"success"});
     })
     
     router.post("/api/users",async (req,res)=>{
      //TODO : Creates a new User
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
       return res.status(201).json({msg:"success"});
  
      // console.log("body",body);
      // return res.json({status:"pending"});
     });

     module.exports = router;