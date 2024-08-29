import mongoose from "mongoose"


export async function dbConnection(){
      try{
        const connect = await mongoose.connect(`${process.env.DB_CONNECTION}`);
        if(connect){
          console.log(`db connection successfull...`);
        }
      }catch(error){
        console.log('Unable To Fetch Data Contact You Db Host...');
      }
}