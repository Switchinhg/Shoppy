import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    loginCode:{type: String ,required:true},
    name:{type: String},
    lastSeen:{type: String, default: "Today"},
    role:{type: String, default: "Cashier",required:true},
    email:{type: String, required:true},
  });

  const user = mongoose.model('users', UserSchema);

  export default user