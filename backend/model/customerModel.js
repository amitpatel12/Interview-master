import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    key: {
      type: mongoose.Types.ObjectId
    },
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    spoc: {
      type: String,
      required: true,
    },
    
    date: {
      type: String
    }
  },
  // {
  //   timestamps: true,
  // }
);

const customerModel = mongoose.model("Customer", customerSchema);
export default customerModel;
