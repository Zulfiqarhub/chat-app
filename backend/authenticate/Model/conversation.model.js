import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
conversationIds:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:"user",
  required:true
}],
messageIds:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:"message",
  required:true,
  default:[]
}]

},{timestamps:true});


export const conversationModel = mongoose.model("conversation",conversationSchema);