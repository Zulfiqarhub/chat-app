import { conversationModel } from "../Model/conversation.model.js";

export const getMessage =async (req,res)=>{
  try{

      const {receiverId} = req.params;
      const userId  = req.userID;

       const chatHistory =  await conversationModel.find({conversationIds:{$all:[userId,receiverId]}}).select('messageIds').populate("messageIds");

      res.status(200).send(chatHistory);

  }catch(error){
    res.status(500).send(error.message);
  }
}