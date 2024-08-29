import bcrypt from "bcrypt";
import {userModels} from "../Model/userModel.js";
import { createJsonkey } from "../../utils/generateToken.js";
import jwt from 'jsonwebtoken';


export const signin = async (req,res)=>{
  //  sigin code goes here....
  try{
    const {fullname,username,password,confirmpassword,gender} = req.body;

    if(password ===confirmpassword){
      
      let hash_passwd = bcrypt.hashSync(password, 10);


      let male_avatar = `https://avatar.iran.liara.run/public/boy?username=${gender}`;
      let female_avatar = `https://avatar.iran.liara.run/public/girl?username=${gender}`

      const insertRecord = new userModels({
        fullname,
        username,
        password: hash_passwd,
        gender,
        profilepic:gender ==='male'? male_avatar : female_avatar
      });
      
      const insertedResult = await insertRecord.save();
      // console.log(insertedResult);
      if(insertedResult){
        const {_id} = insertedResult;
        
        createJsonkey({userId:_id},req,res);
      }else{
        res.status(500).send('Internal Server Error');
      }
      const {profilepic} = insertedResult;
      res.json({fullname,username,gender,profilepic});
    }else{
      res.status(401).send('Password and confirm password mismatch..');
    }
    // console.log(password,confirmpassword);
  }catch(error){
    res.status(401).json({error:error.message});
  }
}

export const login = async (req,res)=>{
    try{

      const {username,password} = req.body;
      const token = req.cookies['webtoken'];
      const queryResult = await userModels.findOne({username});

        if(queryResult.username && queryResult.password){
          const match= await bcrypt.compare(password,queryResult.password || '');
          console.log(match);
          if(match){
            const signature = process.env.SIGNATURE;
             jwt.verify(token || '',signature,(error,decoded)=>{
              console.log(error);
              if(decoded){
                console.log(decoded);
                  res.status(200).json(decoded);
              }else{
                throw new Error(error);
              }
            })
          }
          else{
            res.status(401).send('Invalid Credentials, try again');
          }
        }else{
          res.status(401).send('Invalid Credentials, try again');
        }
      



    }catch(error){
        res.status(401).send(error.message);
    }
    


  // res.send('login response');






}

export const logout = (req,res)=>{
try{
  res.clearCookie('webtoken');
  
  res.send('logout of user successfull');
}catch(error){
  console.log(error.message);
}
 

}