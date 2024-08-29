import jwt from "jsonwebtoken";
import {userModels} from "../authenticate/Model/userModel.js"

export const authenticateUser = async (req,resp,next)=>{
  try{  

    const token = req.cookies['webtoken'];
    const verification =   await jwt.verify(token,process.env.SIGNATURE);
    
   
    if(!verification?.userId){
        resp.status('401').send('User Not Authrized To Use Services');
    }

   
   
    const userDetails =  await userModels.findById(verification.userId);
   
    if(!userDetails?._id){
      resp.status('401').send('User Not Found Validation Failed!');
    }

    req.userID = userDetails._id;
    
    next();

    // to validate the user with its credentials
  }catch(error){
    resp.send('User Not Authorized To Use this app')
  }




}