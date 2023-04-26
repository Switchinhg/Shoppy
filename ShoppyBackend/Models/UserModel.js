import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type: String,required:true},
    lastName:{type: String,required:true},
    dateCreated:{type: String,required:true},
    lastSeen:{type: String, default: "Today"},
    email:{type: String, required:true},
    business:{type:Array, required:false},
    magiklink:{type:Object},
  });

  const user = mongoose.model('users', UserSchema);

  export default user