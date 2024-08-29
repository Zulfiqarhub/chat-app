import { userModels } from "../Model/userModel.js";


const getAllUsers = async (req,res)=>{
  try{
    const userId = req.userID;
    console.log(userId,'<=====');

    const allUsers = await userModels.find({_id:{$ne:userId}}).select("-password");
    console.log(allUsers);
    res.status(200).json(allUsers);
  }catch(error){
    res.status(500).send("Internal Server Error try Again");
  }
}

export default getAllUsers;