import mongoose from "mongoose";
import user from "./UserModel.js"

const BusinessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    staff:{ 
        type: 
        [{ type: mongoose.Schema.Types.ObjectId, ref: user }]
    },
  });

  const business = mongoose.model('Businesses', BusinessSchema);

  export default business