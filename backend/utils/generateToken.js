import jwt from 'jsonwebtoken';

export function createJsonkey(payload,req,res){
  try{
    // console.log('json function');
    const signature = process.env.SIGNATURE;
    const token = jwt.sign(payload,signature);
    console.log('token',token);
    res.status(201).cookie('webtoken',token,{
      maxAge: 12 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite : true
      });
      
  }catch(error){
    res.json({error})
  }
  













} 



