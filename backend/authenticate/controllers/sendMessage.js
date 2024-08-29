import {messageModel} from "../Model/message.model.js";
import {conversationModel} from "../Model/conversation.model.js"; 

export const sendMessage = async (req,res)=>{
  try{
    
    const {message} = req.body;
    const {receiverId} = req.params;
    const senderId = req.userID;

      // first we need to auth the user using jwt token any user as such cannot start using chat
      
      const newMessage = await messageModel.create({
        senderId,
        receiverId,
        message
      });

     const saveMessage = await  newMessage.save();

      const checkconvo = await conversationModel.findOne({conversationIds:{$all:[senderId,receiverId]}});

      if(!checkconvo){
          const newConvo = await conversationModel.create({
            conversationIds : [senderId,receiverId],
            messageIds:[saveMessage._id]
          });
         const saveConvo =  await newConvo.save();

          res.status(200).json(saveConvo);
      }
     
      const {messageIds} = checkconvo;
      messageIds.push(newMessage._id);
      console.log(messageIds);
      const updatedConvo = await conversationModel.findOneAndUpdate({_id:checkconvo._id},{messageIds});

      res.status(200).json(checkconvo);


      console.log();





  }catch(error){
    console.log(error.message);
  }
  






}